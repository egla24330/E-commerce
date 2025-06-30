import React, { useEffect, useState, useContext } from 'react';
import { User, Mail, IdCard, Gift, Share2 } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShopContext } from "../context/Shopcontext.jsx";
import AuthContext from '../context/Authcontext';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import ReceiptSuccessModal from '../components/ReceiptSuccessModal.jsx';
import { Helmet } from 'react-helmet';

const ProfilePage = () => {
  const { backendurl } = useContext(ShopContext);
  const { token } = useContext(AuthContext);
  const [withdrawal, setWithdrawal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [banckAccount, setBankAccount] = useState('');
  const [Name, setName] = useState('');
  const [loadingWithdrawal, setLoadingWithdrawal] = useState(false); // Renamed for clarity
  const [loadingProfile, setLoadingProfile] = useState(true); // New loading state for profile data
  const [id, setId] = useState('');
  const [warn, setWarn] = useState(false);
  const [user, setUser] = useState(null); // Initialize as null to clearly indicate no data yet
  const [deposite, setDeposit] = useState(0);
  const [Phone, setPhone] = useState('');

  ////
  const [showSuccess, setShowSuccess] = useState(false);

  /////

  useEffect(() => {
    if (withdrawalAmount < 999) {
      setWarn(true);
    } else {
      setWarn(false);
    }
  }, [withdrawalAmount]);

  const fetchUserData = async () => {
    setLoadingProfile(true); // Set loading to true when fetching starts
    try {
      const response = await axios.post(`${backendurl}/api/user/me`, {}, {
        headers: { token },
      });
      console.log('User data fetched:', response);

      if (response.data.success === true) {
        setUser(response.data.userData);
        setId(response.data.userData._id);
        setDeposit(response.data.userData.coins);
      } else {
        toast.error('Failed to fetch user data');
      }
    } catch (error) {
      toast.error('Error fetching user data');
      console.error('Error fetching user data:', error);
    } finally {
      setLoadingProfile(false); // Set loading to false regardless of success or error
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [token, backendurl]); // Added token and backendurl to dependency array

  const inviteLink = user?.referralCode ? `${window.location.origin}/register?ref=${user.referralCode}` : '';

  const handleInvite = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Join zaycommerce',
          text: 'Join zaycommerce and get exclusive benefits!',
          url: inviteLink,
        });
      } else {
        await navigator.clipboard.writeText(inviteLink);
        toast.success('Invite link copied to clipboard!');
      }
    } catch (err) {
      toast.error('Failed to share invite link.');
      console.error(err);
    }
  };

  let withdrawalFun = async () => {
    let myLoader = toast.loading('Processing withdrawal request...');

    if (!Phone.trim() || !/^09\d{8}$/.test(Phone)) {
      toast.error("Enter a valid Ethiopian phone number (e.g., 09XXXXXXXX)");
      toast.update(myLoader, { render: 'Invalid phone number', type: 'error', isLoading: false, autoClose: 3000 });
      return;
    }

    if (!banckAccount.trim() || banckAccount.length < 6) {
      toast.error("Enter a valid Bank Account Number");
      toast.update(myLoader, { render: 'Invalid bank account number', type: 'error', isLoading: false, autoClose: 3000 });
      return;
    }

    if (warn) {
      toast.error('Minimum withdrawal amount is 999 coin.');
      toast.update(myLoader, { render: 'Minimum withdrawal amount not met', type: 'error', isLoading: false, autoClose: 3000 });
      return;
    } else if (withdrawalAmount > deposite) {
      toast.error('You cannot withdraw more than your current balance.');
      toast.update(myLoader, { render: 'Insufficient balance', type: 'error', isLoading: false, autoClose: 3000 });
      return;
    }

    setLoadingWithdrawal(true);
    try {
      let leftDeposite = deposite - withdrawalAmount;
      const res = await axios.post(`${backendurl}/api/withdrawal/withdrawal-update`, { coin: leftDeposite }, {
        headers: { token },
      });

      if (res.data.success) {
        const response = await axios.post(`${backendurl}/api/withdrawal/withdrawal-request`, {
          withdrawalAmount,
          bankAccount: banckAccount,
          name: Name,
          userId: id,
          phone: Phone,
          leftDeposite
        });

        if (response.data.success) {
          fetchUserData(); // Refresh user data after withdrawal
          toast.update(myLoader, { render: 'Withdrawal request submitted successfully!', type: 'success', isLoading: false, autoClose: 3000 });
          setShowSuccess(true);
        } else {
          toast.error(response.data.message);
          toast.update(myLoader, { render: response.data.message, type: 'error', isLoading: false, autoClose: 3000 });
        }
      } else {
        toast.error('Something went wrong');
        toast.update(myLoader, { render: 'Failed to update coins', type: 'error', isLoading: false, autoClose: 3000 });
      }
    } catch (err) {
      console.error(err);
      fetchUserData(); // Refresh user data in case of error
      toast.update(myLoader, { render: 'Error processing withdrawal request', type: 'error', isLoading: false, autoClose: 3000 });
    } finally {
      setLoadingWithdrawal(false);
    }
  };

  if (loadingProfile) {
    return (
      <div className="flex justify-center items-center h-[70vh] gap-2">
        <ClipLoader color="#4F46E5" size={30} /> <p>loading user data .....</p>
      </div>
    );
  }

  // This check is important now that `user` can be null initially
  if (!user) {
    return <div className="p-6 text-center text-red-600">Failed to load profile data. Please try again.</div>;
  }

  return (
    <>
      <Helmet>
        <title>Profile | zaycommerce</title>
        <meta name="description" content="View and manage your zaycommerce profile, check your ZCoins balance, invite friends, and request withdrawals." />
      </Helmet>
      <div className="max-w-3xl mx-auto mt-10 p-1 sm:p-3 bg-white shadow-lg rounded-2xl border border-gray-200 space-y-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          {user.avatar ? <img src={user.avatar} alt="User Avatar" className="w-12 h-12 rounded-full" /> : <div className='flex items-center justify-center bg-red-100 w-[50px] h-[50px] rounded-full'> <User className="w-6 h-6 text-indigo-600" /> </div>}

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">Welcome to your profile</p>
          </div>
        </div>

        {/* User Info */}
        <div className="grid gap-4 sm:grid-cols-2 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-indigo-500" />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5 text-yellow-500" />
            <span>ZCoins: <strong>{user.coins}</strong></span>
          </div>
        </div>

        {/* Invite Section */}
        <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <p className="text-indigo-700 font-medium">🎁 Invite friends</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <button
              onClick={handleInvite}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <span className="text-sm text-gray-500 break-all">{inviteLink}</span>
          </div>
        </div>
        {/* Withdrawal Section */}
        <button
          onClick={() => setWithdrawal(!withdrawal)}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          {withdrawal ? 'Cancel Withdrawal' : 'Request Withdrawal'}
        </button>
        {withdrawal && (
          <div
            className={`mt-4 p-4 rounded-xl border ${warn ? 'bg-red-50' : 'bg-green-50'} ${deposite < withdrawalAmount ? 'bg-red-200' : 'bg-200'}`}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Withdrawal Request</h3>
            <p className="text-sm text-gray-600 mb-4">Enter your bank account details to request a withdrawal.</p>
            <p className="text-sm text-gray-600 mb-4 font-extrabold">1 ZCoins = 0.25 ETB</p>
            {warn && (
              <p className="text-red-600 text-sm mb-4">Minimum withdrawal amount is 999 ZCoins.</p>
            )}

            <div className='flex flex-col sm:flex-row gap-2'>
              <div className='w-full p-1 '>
                <label className="block text-xs text-gray-700 mb-2">Withdrawal Amount (in ZCoins)</label>
                <input
                  type="number"
                  placeholder="Withdrawal Amount"
                  onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg mb-3"
                />
              </div>

              <div className='w-full p-1 '>
                <label className="block text-xs text-gray-700 mb-2">ETB</label>
                <input
                  type="text"
                  placeholder="Withdrawal Amount"
                  value={withdrawalAmount * 0.25 + ' ETB'}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-lg mb-3"
                />
              </div>

              <div className='w-full p-1 '>
                <label className="block text-xs text-gray-700 mb-2">Balance</label>
                <input
                  type="number"
                  placeholder="😠😠😠😠"
                  disabled
                  value={deposite < withdrawalAmount ? 'Insufficient' : deposite - withdrawalAmount}
                  className="w-full p-2 border border-gray-300 rounded-lg mb-3"
                />
              </div>
            </div>

            <div className='w-full p-1'>
              <label className="block text-sm text-gray-700 mb-2">Account Holder Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Account Holder Name"
                className="w-full p-2 border border-gray-300 rounded-lg mb-3"
              />
            </div>

            <div className='w-full p-1 '>
              <label className="block text-sm text-gray-700 mb-2">id</label>
              <input
                type="text"
                value={id}
                disabled
                className="w-full p-2 border border-gray-300 rounded-lg mb-3"
              />
            </div>

            <div className='w-full p-1 '>
              <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number"
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-3"
              />
            </div>

            <input
              type="text"
              placeholder="Bank Account Number"
              value={banckAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-3"
            />
            <button
              onClick={withdrawalFun}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              disabled={loadingWithdrawal} // Disable button during withdrawal processing
            >
              {loadingWithdrawal ? <ClipLoader color="#ffffff" size={20} /> : 'Submit Withdrawal Request'}
            </button>
          </div>
        )}
      </div>

      <ReceiptSuccessModal
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        p1={`Hi ${Name ? Name : 'User'}, Your withdrawal request has been successfully submitted. Please wait for the processing time to complete.`}
        p2="Thank you for your patience!"
      />
    </>
  );
};

export default ProfilePage;