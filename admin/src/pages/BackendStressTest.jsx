// src/components/BackendStressTest.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiActivity, FiAlertTriangle, FiCheck, FiX, FiServer, FiBarChart2, FiClock } from 'react-icons/fi';

const BackendStressTest = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [stats, setStats] = useState({
    totalRequests: 0,
    successful: 0,
    failed: 0,
    minResponseTime: 0,
    maxResponseTime: 0,
    avgResponseTime: 0
  });
  const [testConfig, setTestConfig] = useState({
    url: 'http://localhost:3000/',
    requestsPerSecond: 50,
    duration: 30, // seconds
    credentials: {
      user: 'testadmin',
      password: 'testpassword'
    }
  });
  const [errorRate, setErrorRate] = useState(0);
  const [responseTimes, setResponseTimes] = useState([]);
  const [activeRequests, setActiveRequests] = useState(0);
  const testStartTime = useRef(0);
  
  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setTestConfig(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setTestConfig(prev => ({
        ...prev,
        [name]: name === 'requestsPerSecond' || name === 'duration' ? parseInt(value) : value
      }));
    }
  };

  const simulateLogin = async () => {
    const start = Date.now();
    try {
      const response = await axios.post(testConfig.url, testConfig.credentials, {
        timeout: 5000
      });
      const duration = Date.now() - start;
      return { success: true, duration, status: response.status };
    } catch (error) {
      const duration = Date.now() - start;
      return { 
        success: false, 
        duration,
        status: error.response?.status || 0,
        message: error.message
      };
    }
  };

  const runStressTest = async () => {
    setIsTesting(true);
    setTestResults([]);
    setStats({
      totalRequests: 0,
      successful: 0,
      failed: 0,
      minResponseTime: 0,
      maxResponseTime: 0,
      avgResponseTime: 0
    });
    setResponseTimes([]);
    setErrorRate(0);
    testStartTime.current = Date.now();
    
    const testDuration = testConfig.duration * 1000;
    const requestsPerInterval = Math.max(1, Math.floor(testConfig.requestsPerSecond / 10));
    const interval = 100; // ms
    
    const intervalId = setInterval(async () => {
      if (Date.now() - testStartTime.current > testDuration) {
        clearInterval(intervalId);
        setIsTesting(false);
        return;
      }
      
      const requests = [];
      for (let i = 0; i < requestsPerInterval; i++) {
        setActiveRequests(prev => prev + 1);
        requests.push(
          simulateLogin().then(result => {
            setActiveRequests(prev => prev - 1);
            return result;
          })
        );
      }
      
      const results = await Promise.all(requests);
      setTestResults(prev => [...prev, ...results]);
      
      // Update stats
      setStats(prev => {
        const newStats = { ...prev };
        const successes = results.filter(r => r.success);
        const failures = results.filter(r => !r.success);
        
        newStats.totalRequests += results.length;
        newStats.successful += successes.length;
        newStats.failed += failures.length;
        
        // Update response times
        const durations = results.map(r => r.duration);
        setResponseTimes(prev => [...prev, ...durations]);
        
        if (durations.length > 0) {
          const min = Math.min(...durations);
          const max = Math.max(...durations);
          const sum = durations.reduce((a, b) => a + b, 0);
          const avg = sum / durations.length;
          
          newStats.minResponseTime = prev.minResponseTime === 0 ? min : Math.min(prev.minResponseTime, min);
          newStats.maxResponseTime = Math.max(prev.maxResponseTime, max);
          newStats.avgResponseTime = prev.avgResponseTime === 0 ? avg : 
            (prev.avgResponseTime * prev.totalRequests + sum) / (prev.totalRequests + durations.length);
        }
        
        return newStats;
      });
      
      setErrorRate(stats.totalRequests > 0 ? (stats.failed / stats.totalRequests) * 100 : 0);
    }, interval);
  };

  // Calculate requests per second
  const requestsPerSecond = stats.totalRequests > 0 
    ? stats.totalRequests / ((Date.now() - testStartTime.current) / 1000) 
    : 0;

  // Generate chart data
  const generateChartData = () => {
    if (responseTimes.length === 0) return [];
    
    const maxTime = Math.max(...responseTimes);
    const minTime = Math.min(...responseTimes);
    const range = maxTime - minTime;
    const bucketCount = 20;
    
    const buckets = Array(bucketCount).fill(0);
    const bucketSize = range / bucketCount;
    
    responseTimes.forEach(time => {
      const bucketIndex = Math.min(
        bucketCount - 1, 
        Math.floor((time - minTime) / bucketSize)
      );
      buckets[bucketIndex]++;
    });
    
    return buckets;
  };

  const chartData = generateChartData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Backend Stress Testing</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Simulate heavy traffic on your admin login endpoint to identify performance bottlenecks and potential failure points.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Configuration Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FiActivity className="mr-2" /> Test Configuration
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API Endpoint
                </label>
                <input
                  type="text"
                  name="url"
                  value={testConfig.url}
                  onChange={handleConfigChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isTesting}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Requests per Second
                  </label>
                  <input
                    type="number"
                    name="requestsPerSecond"
                    value={testConfig.requestsPerSecond}
                    onChange={handleConfigChange}
                    min="1"
                    max="500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isTesting}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (seconds)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={testConfig.duration}
                    onChange={handleConfigChange}
                    min="5"
                    max="300"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isTesting}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Test Username
                </label>
                <input
                  type="text"
                  name="credentials.user"
                  value={testConfig.credentials.user}
                  onChange={handleConfigChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isTesting}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Test Password
                </label>
                <input
                  type="password"
                  name="credentials.password"
                  value={testConfig.credentials.password}
                  onChange={handleConfigChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isTesting}
                />
              </div>
              
              <button
                onClick={runStressTest}
                disabled={isTesting}
                className={`w-full py-3 rounded-md font-medium flex items-center justify-center ${
                  isTesting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg'
                }`}
              >
                {isTesting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Running Test...
                  </>
                ) : (
                  <>
                    <FiActivity className="mr-2" />
                    Start Stress Test
                  </>
                )}
              </button>
              
              {isTesting && (
                <button
                  onClick={() => setIsTesting(false)}
                  className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium"
                >
                  <FiX className="inline mr-2" />
                  Stop Test
                </button>
              )}
            </div>
          </motion.div>
          
          {/* Stats Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 lg:col-span-2"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FiBarChart2 className="mr-2" /> Performance Metrics
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="text-sm text-blue-700 font-medium mb-1">Total Requests</div>
                <div className="text-2xl font-bold text-blue-900">{stats.totalRequests}</div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <div className="text-sm text-green-700 font-medium mb-1">Successful</div>
                <div className="text-2xl font-bold text-green-900">{stats.successful}</div>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                <div className="text-sm text-red-700 font-medium mb-1">Failed</div>
                <div className="text-2xl font-bold text-red-900">{stats.failed}</div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                <div className="text-sm text-purple-700 font-medium mb-1">Req/Sec</div>
                <div className="text-2xl font-bold text-purple-900">{requestsPerSecond.toFixed(1)}</div>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                <div className="text-sm text-amber-700 font-medium mb-1">Error Rate</div>
                <div className="text-2xl font-bold text-amber-900">{errorRate.toFixed(1)}%</div>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                <div className="text-sm text-indigo-700 font-medium mb-1">Active Requests</div>
                <div className="text-2xl font-bold text-indigo-900">{activeRequests}</div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <FiClock className="mr-2" /> Response Times (ms)
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Minimum</div>
                  <div className="text-xl font-bold text-gray-800">{stats.minResponseTime || '-'}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Average</div>
                  <div className="text-xl font-bold text-gray-800">{stats.avgResponseTime ? stats.avgResponseTime.toFixed(1) : '-'}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Maximum</div>
                  <div className="text-xl font-bold text-gray-800">{stats.maxResponseTime || '-'}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Response Time Distribution</h3>
              <div className="bg-gray-50 rounded-lg p-4 h-40 border border-gray-200 flex items-end">
                {chartData.length > 0 ? (
                  <div className="flex items-end w-full h-32 gap-px">
                    {chartData.map((count, index) => (
                      <div 
                        key={index}
                        className="flex-1 bg-blue-500 rounded-t"
                        style={{ 
                          height: `${(count / Math.max(...chartData)) * 100}%`,
                          backgroundColor: count === Math.max(...chartData) 
                            ? '#3B82F6' 
                            : count === Math.min(...chartData) 
                              ? '#93C5FD' 
                              : '#60A5FA'
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-400 text-center w-full">
                    No data available. Run a test to see response time distribution.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Test Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FiServer className="mr-2" /> Test Results
          </h2>
          
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-50">
                <tr>
                  <th className="py-2 px-3 text-left">Status</th>
                  <th className="py-2 px-3 text-left">Response Time</th>
                  <th className="py-2 px-3 text-left">HTTP Status</th>
                  <th className="py-2 px-3 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                {testResults.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500">
                      No test results yet. Run a test to see the results.
                    </td>
                  </tr>
                ) : (
                  testResults.map((result, index) => (
                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="py-2 px-3">
                        {result.success ? (
                          <span className="inline-flex items-center text-green-600">
                            <FiCheck className="mr-1" /> Success
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-red-600">
                            <FiX className="mr-1" /> Failed
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-3">{result.duration} ms</td>
                      <td className="py-2 px-3">
                        {result.status || 'N/A'}
                      </td>
                      <td className="py-2 px-3 text-gray-600 max-w-xs truncate">
                        {result.message || '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
        
        {/* Warning Banner */}
        {isTesting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start"
          >
            <FiAlertTriangle className="text-yellow-500 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-yellow-800">Warning: Stress Testing in Progress</h3>
              <p className="text-yellow-700">
                This tool is sending {testConfig.requestsPerSecond} requests per second to your backend. 
                This may cause performance degradation or service interruption. Use only in development environments.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BackendStressTest;