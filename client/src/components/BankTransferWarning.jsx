import { AlertTriangle } from 'lucide-react';

function BankTransferWarning() {
    return (
        <div className="border-red-500 bg-red-50 text-red-800 p-4 mb-5 flex items-center">
            <AlertTriangle className="mr-2 h-6 w-6" />
            <div>
                <strong className="font-semibold">Important Note Regarding Bank Transfers</strong>
                <p className="mt-1 text-sm leading-relaxed">
                    Please ensure that the <strong className="font-semibold">name of the account holder</strong> used for the bank transfer <strong className="font-semibold">exactly matches the name you provided in your order form</strong>.
                </p>
                <p className="text-sm leading-relaxed">
                    Discrepancies between the names on the transfer receipt and your order details may lead to delays in processing your order or even cancellation.
                </p>
                <p className="text-sm leading-relaxed">
                    To avoid any issues, double-check the beneficiary name and account details before making the transfer.
                </p>
            </div>
        </div>
    );
}

export default BankTransferWarning;