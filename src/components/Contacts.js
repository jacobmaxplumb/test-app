import axios from "axios";
import { useEffect, useState } from "react";

const endpoint = `${process.env.REACT_APP_API_URL}/contacts`;

const initialFormValues = {
    fullName: '',
    phone: ''
}

export const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [formValues, setFormValues] = useState(initialFormValues);

    const getContacts = async () => {
        if (localStorage.getItem('contacts')) {
            setContacts(JSON.parse(localStorage.getItem('contacts')))
        } else {
            const { data } = await axios.get(endpoint);
            setContacts(data);
        }
    }

    const addContact = async () => {
        const { data } = await axios.post(endpoint, formValues);
        setContacts([...contacts, data]);
        setFormValues(initialFormValues)
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    }

    useEffect(() => {
        getContacts();
    }, []);

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts])

    return (
    <>
        <h1>Contacts</h1>
        <input name="fullName" value={formValues.fullName} onChange={handleInputChange} />
        <input name="phone" value={formValues.phone} onChange={handleInputChange} />
        <button onClick={addContact}>Add</button>
        <ul>
            {contacts.map(contact => <li key={contact.id}>{contact.fullName} {contact.phone}</li>)}
        </ul>

    </>)
}