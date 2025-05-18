export default function InputBox({placeholder, onChange}){
    return <div>
        <input onChange={onChange} className="font-architects text-center text-xl border-2 border-black rounded-xl" type="text" placeholder={placeholder} />
    </div>
}