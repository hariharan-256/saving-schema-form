import React, { useState } from 'react';
import styles from './App.module.css';
import Modal from './components/Modal/Modal';
import Textbox from './components/UI/Textbox';
import axios from 'axios';

const App = () => {
  const [open, setOpen] = useState(false);
  const _handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  }

  const [select, setSelected] = useState([]);
  const [values, setValues] = useState("");
  const [names, setNames] = useState({
    segment_name: "",
    first_name:  "",
    last_name: "",
    gender: "",
    age: "",
    account_name:"",
    city:"",
    state:""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(
      value
    );
    setNames({
      ...names,
      [name]: value,
  });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
   setSelected([...select, JSON.parse(values)]);
   setTimeout(() => {
    setValues("")
   }, 1000);
  }

  const _formSubmit = async(e) => {
    // console.log(names);
    e.preventDefault();
    const reqObj = {
        segment_name: names?.segment_name,
        schema: [
        {first_name: names?.first_name},
        {last_name: names?.last_name},
        {gender: names?.gender},
        {age: names?.age},
        {account_name: names?.account_name},
        {city: names?.city},
        {state: names?.state},
        ]
    }
    // not done below code
    const res = await axios.post(
			`https://webhook.site/32325924-ca24-46a5-adb5-2e3eca854438`,
			reqObj
		);
  }

  const SCHEMA = [
    { value: "first_name", label: "First Name" },
    { value: "last_name", label: "Last Name" },
    { value: "gender", label: "Gender" },
    { value: "age", label: "Age" },
    { value: "account_name", label: "Account Name" },
    { value: "city", label: "City" },
    { value: "state", label: "State" },
  ]

  return <>
    <div className={styles.app}>
      <button onClick={_handleOpen} className={`${styles.btn} ${styles[`btn-primary`]}`}>Save Segment</button>
      <Modal outerClick={() => setOpen(false)} isOpened={open} className={open && "Show"}>
        <form action="" onSubmit={_formSubmit}>
        <div className={styles[`modal-wrap`]}>
          <div>
            <div className={styles[`modal-header`]}>
              <h4>Saving Segment</h4>
            </div>
            <div className={styles[`modal-body`]}>
              <label htmlFor="">Enter the Name of the Segment</label>
              <Textbox label="Name of the Segment" name="segment_name" onChange={handleChange}/>
              <p>To save your segment, you need to add the schemas to build the query</p>
              <ul className={styles.labels}>
                <li>-User Traits</li>
                <li>-Group Traits</li>
              </ul>
              {select?.length !== 0 && (
                select.map((item, index, fullArr) => {
                  const full = fullArr
                  console.log(item?.value,"opopopopo");
                  return (
                    <div className={styles[`mb-30`]}>
                      <select onChange={handleChange} name={item?.value} value={names.value}>
                        <option value={item.value} selected disabled>{item.label}</option>
                        {SCHEMA.filter((el) => !Boolean(full.filter((v) => item.value !== v.value).find((e) => e.value === el.value))).map((v) => <><option value={v?.value}>{v?.label}</option></>)}
                      </select>
                    </div>
                  )
                })
              )}
              <select name="schema" onChange={handleChange} value={values}>
                <option value="0" selected defaultChecked>Add schema to segment</option>
                {SCHEMA.filter(v => !select.find((e) => e.value === v?.value)).map((item) => <option value={JSON.stringify(item)}>{item?.label}</option>)}
              </select>
              <button type='submit' onClick={handleSubmit} disabled={values.length === 0 && true} className={styles.link}>+ Add new schema</button>
            </div>
          </div>
          <div className={styles[`modal-footer`]}>
            <button type='submit' className={`${styles.btn} ${styles[`btn-secondary`]}`}>Save the Segment</button>
            <button onClick={() => setOpen(false)} className={`${styles.btn} ${styles[`btn-tertiary`]}`}>Cancel</button>
          </div>
        </div>
        </form>
      </Modal>
    </div>
  </>

}

export default App;
