const Textbox = (props) => {
    const {onChange,value,label,className,name} = props;
    return<input onChange={onChange} name={name} value={value} placeholder={label} className={className}/>
}

export default Textbox;