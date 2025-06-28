 const  SummaryCard = ({ icon, label, value }) => (
    <div className="flex items-center justify-between p-5 bg-white rounded-xl shadow-sm hover:shadow-md border transition-shadow duration-200">
        <div className="flex items-center gap-3 text-gray-700">
            <span className="text-xl">{icon}</span>
            <span className="text-[12px] font-bold">{label}</span>
        </div>
        <div className="text-[12px] font-bold ">
             {Number(value).toLocaleString()}
        </div>
    </div>
);

export default SummaryCard;