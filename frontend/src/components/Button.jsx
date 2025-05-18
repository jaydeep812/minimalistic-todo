export default function Button({label,onClick}){
    return <div>
        <button onClick={onClick} className="font-architects font-bold text-3xl px-6 py-2 border-4 border-black rounded-xl m-4">{label}</button>
    </div>
}