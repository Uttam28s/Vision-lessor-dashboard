/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom/dist';

const Home = () => {
  // const [billData, setBillData] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('users'))
    if (user?.role !== 'admin'){
        navigate('/create-bill');
    } 
  }, []);

  return (
    <div>
      <p>Monthly Report</p>
    </div>
  )
}

export default Home