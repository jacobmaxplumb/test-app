import axios from "axios";
import { useEffect, useState } from "react";

export const useItems = (key, initialFormValues) => {
  const endpoint = `${process.env.REACT_APP_API_URL}/${key}`;
  const [items, setItems] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);

  const getItems = async () => {
    if (localStorage.getItem(key)) {
      setItems(JSON.parse(localStorage.getItem(key)));
    } else {
      const { data } = await axios.get(endpoint);
      setItems(data);
    }
  };

  const addItem = async () => {
    const { data } = await axios.post(endpoint, formValues);
    setItems([...items, data]);
    setFormValues(initialFormValues);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [items]);

  return [items, formValues, addItem, handleInputChange];
};
