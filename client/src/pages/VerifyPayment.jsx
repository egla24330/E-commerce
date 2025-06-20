import { useEffect, useState, useRef } from "react";
import { UploadCloud, X } from "lucide-react";
import { useContext } from "react";
import { ShopContext } from "../context/Shopcontext.jsx";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReceiptSuccessModal from '../components/ReceiptSuccessModal';
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

export default function VerifyPayment() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [receipt, setReceipt] = useState(null);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState("Calculating...");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  const { backendurl } = useContext(ShopContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const cancelTokenSource = useRef(null);
  const startTimeRef = useRef(null);

  const handleUploadSuccess = () => {
    setShowSuccess(true);
  };

  let fetchOrder = async () => {
    try {
      const res = await axios.post(`${backendurl}/api/order/find-order`, { id });
      if (res.data.success) {
        setName(res.data.order.customerInfo.name);
        setPhone(res.data.order.customerInfo.phone);
        setTotalPrice(res.data.order.totalPrice);
      } else {
        toast.error("Failed to fetch order details.");
      }
    } catch (error) {
      toast.error("Error fetching order.");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!receipt) {
      toast.error("Please upload your receipt.");
      return;
    }

    const formData = new FormData();
    formData.append("receipt", receipt);
    formData.append("id", id);

    cancelTokenSource.current = axios.CancelToken.source();
    startTimeRef.current = new Date().getTime();

    try {
      setLoading(true);
      setIsCanceled(false);

      const res = await axios.post(`${backendurl}/api/order/upload-receipt`, formData, {
        cancelToken: cancelTokenSource.current.token,
        onUploadProgress: (progressEvent) => {
          const { loaded, total, timeStamp } = progressEvent;
          const percent = Math.round((loaded * 100) / total);
          const currentTime = new Date().getTime();
          const elapsedTime = (currentTime - startTimeRef.current) / 1000;

          const speed = loaded / elapsedTime; // bytes per second
          const remainingBytes = total - loaded;
          const estimatedTime = remainingBytes / speed;

          setUploadPercentage(percent);
          setUploadSpeed(speed);
          setTimeRemaining(estimatedTime > 0 ? `${Math.ceil(estimatedTime)}s remaining` : "Finishing...");
        }
      });

      if (res.data.success) {
        toast.success('Receipt uploaded successfully!');
        handleUploadSuccess();
      } else {
        toast.error('Oops, something went wrong.');
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        toast.info('Upload canceled.');
      } else {
        toast.error('Upload failed.');
      }
    } finally {
      setLoading(false);
      setUploadPercentage(0);
      setUploadSpeed(0);
      setTimeRemaining("Calculating...");
    }
  };

  const handleCancelUpload = () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel();
      setIsCanceled(true);
      setLoading(false);
      setUploadPercentage(0);
      setUploadSpeed(0);
      setTimeRemaining("Upload canceled.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Verify Payment | Yegna Shop</title>
        <meta name="description" content="Upload your bank receipt to verify your payment for your Yegna Shop order." />
        <meta property="og:title" content="Verify Payment | Yegna Shop" />
        <meta property="og:description" content="Upload your bank receipt to verify your payment for your Yegna Shop order." />
      </Helmet>

      <div className="max-w-xl mx-auto mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🧾 Payment Verification
        </h1>

        <div className="mb-6 space-y-1">
          <p className="text-gray-500">Order ID:</p>
          <p className="font-semibold text-gray-800 bg-gray-100 p-2 rounded-md">{id}</p>
          <p className="text-gray-500">Name:</p>
          <p className="font-semibold text-gray-800 bg-gray-100 p-2 rounded-md">{name}</p>
          <p className="text-gray-500">Phone:</p>
          <p className="font-semibold text-gray-800 bg-gray-100 p-2 rounded-md">+251 {phone}</p>
          <p className="text-gray-500">Total Amount:</p>
          <p className="text-lg font-bold text-green-600">ETB {totalPrice}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Upload Bank Receipt</label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition">
              {receipt ? <img src={URL.createObjectURL(receipt)} alt="receipt" /> : <UploadCloud className="mx-auto text-blue-500 mb-3" size={40} />}
              <p className="text-gray-500 mb-2">{receipt ? receipt.name : "Click or drag to upload receipt"}</p>
              <input type="file" accept="image/*,application/pdf" onChange={(e) => setReceipt(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>

          {loading && (
            <>
              {/* Fancy Framer Motion Progress Bar */}
              <div className="flex items-center justify-between">
                <div className="w-3/4 bg-gray-200 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadPercentage}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                    className="bg-blue-600 h-4 text-xs text-white text-center"
                  >
                    {uploadPercentage}%
                  </motion.div>
                </div>

                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={handleCancelUpload}
                  className="ml-4 text-red-600 hover:text-red-800 p-2 rounded-full transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Speed & Time Display */}
              <div className="text-center text-gray-600 text-sm mt-2">
                {`${(uploadSpeed / 1024).toFixed(1)} KB/s`} • {timeRemaining}
              </div>

              {/* Fancy Circular Progress */}
              <div className="flex justify-center my-4">
                <motion.svg
                  className="w-16 h-16 text-blue-600"
                  viewBox="0 0 100 100"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="250"
                    strokeDashoffset="200"
                  />
                </motion.svg>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Submit for Verification"}
          </button>
        </form>

        <div>
          <ReceiptSuccessModal
            p1="We received your receipt and will get back to you soon."
            p2="Thank you for your patience!"
            show={showSuccess}
            onClose={() => {
              localStorage.removeItem('yegna_cart');
              localStorage.removeItem('order');
              navigate('/');
              location.reload();
            }}
          />
        </div>
      </div>
    </>
  );
}
