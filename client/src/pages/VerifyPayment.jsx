import { useEffect, useState } from "react";
import { UploadCloud, CheckCircle, CircleX } from "lucide-react";
import { useContext } from "react";
import { ShopContext } from "../context/Shopcontext.jsx";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReceiptSuccessModal from '../components/ReceiptSuccessModal'
import { Helmet } from "react-helmet";
export default function VerifyPayment() {
  const [receipt, setReceipt] = useState(null);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [totalPrice, setTotalPrice] = useState(0)

  let { id } = useParams()

  const [showSuccess, setShowSuccess] = useState(false)

  const handleUploadSuccess = () => {
    setShowSuccess(true)
  }

  const { backendurl } = useContext(ShopContext);

  let fetchOrder = async () => {
    const res = await axios.post(`${backendurl}/api/order/find-order`, { id });
    console.log("fetch order", res);

    if (res.data.success) {
      setName(res.data.order.customerInfo.name);
      setPhone(res.data.order.customerInfo.phone);
      setTotalPrice(res.data.order.totalPrice)
      console.log(res)
    } else {
      toast.error("Failed to fetch order details.");
    }


  }

  useEffect(() => {
    fetchOrder()

  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!receipt) {
      toast.error("Please upload your receipt.");
      return;
    }

    const formData = new FormData();
    formData.append("receipt", receipt);
    formData.append("id", id);
    const res = await axios.post(`${backendurl}/api/order/upload-receipt`, formData)
    console.log(res)
    if (res.data.success) {

      toast.success('Receipt uploaded successfully!');
      handleUploadSuccess()

    } else {
      toast.error('oopps something went wrong');
      console.log(res)

    }
  };
  // Spinner state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

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
          <p className="font-semibold text-gray-800 bg-gray-100 p-2 rounded-md">
            {id}
          </p>
          <p className="text-gray-500"> Name:</p>
          <p className="font-semibold text-gray-800 bg-gray-100 p-2 rounded-md">
            {name}
          </p>
          <p className="text-gray-500">Phone:</p>
          <p className="font-semibold text-gray-800 bg-gray-100 p-2 rounded-md">
            +251 {phone}
          </p>
          <p className="text-gray-500">Total Amount:</p>
          <p className="text-lg font-bold text-green-600">ETB{' '} {totalPrice}</p>
        </div>

        <form
          onSubmit={async (e) => {
            setLoading(true);
            await handleSubmit(e);
            setLoading(false);
          }}
          className="space-y-5"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Upload Bank Receipt
            </label>

            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition">

              {receipt ? <img src={URL.createObjectURL(receipt)} alt="receipt" /> : <UploadCloud className="mx-auto text-blue-500 mb-3" size={40} />}
              <p className="text-gray-500 mb-2">
                {receipt ? receipt.name : "Click or drag to upload receipt"}
              </p>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => setReceipt(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition flex items-center justify-center"
            disabled={loading}
          >
            {loading && (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            )}
            {loading ? "Submitting..." : "Submit for Verification"}
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
              location.reload()
            }} />
        </div>
      </div>
    </>
  );
}
