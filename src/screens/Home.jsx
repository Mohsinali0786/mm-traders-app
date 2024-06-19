import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "./card";
import Footer from '../components/Footer'
import Carousel from '../components/carousel'
import {products} from '../data'
import EnhancedTable from '../components/table'
function Home() {
  useEffect(()=>{
  
  },localStorage.getItem('loginData'))
  const sizes=['small','medium','large','x-large']
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel/>
      </div>
      <div className="m-3 d-flex gap-2 flex-wrap">
        {
          products.map((e,i)=>{
            return(
              <Card product={e}/>
            )
          }
          )
        }



      </div>
    <div>
      <Footer/>
    </div>
    </div>
  );
}

export default Home;
