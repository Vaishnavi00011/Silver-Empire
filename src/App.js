import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
// ... बाकी सभी पेज इम्पोर्ट्स ...
import Rings from './Pages/Rings';
import RingsProduct from './Pages/RingsProduct';
import Earing from './Pages/Earing';
import Bracelate from './Pages/Bracelate';
import Dailywear from './Pages/Dailywear';
import Collection from './Pages/Collection';
import Gift from './Pages/Gift';
import Dashboard from './Admin Panel/Dashboard';
import AddToCart from './Pages/AddToCart';
import Checkout from './Pages/Checkout';
import BuyNow from './Pages/BuyNow';
import WishList from './Pages/WishList';
import OurStore from './Pages/OurStore';
import Nacklace from './Pages/Nacklace';
import NacklaceSet from './Pages/NacklaceSet';
import Bangles from './Pages/Bangles';
import Nosepin from './Pages/Nosepin';
import CategoryCollection from './Pages/CategoryCollection';
import ProductInfo from './Pages/ProductInfo';
import ScrollTo from './Components/ScrollTo';
import Profile from './Pages/Profile';

// 👇 Preloader को इम्पोर्ट करें
import Preloader from './Components/Preloader'; 


function App() {
  // 1. स्टेट (State) जो बताता है कि एप्लीकेशन अभी लोड हो रहा है या नहीं
  const [isAppLoading, setIsAppLoading] = useState(true);

  // 2. useEffect जो केवल पहली बार कंपोनेंट माउंट होने पर चलेगा
  useEffect(() => {
    // यहाँ आप अपनी वास्तविक डेटा फेचिंग लॉजिक (real data fetching logic) लगा सकते हैं।
    // अभी 2 सेकंड का टाइमर (Timer) इस्तेमाल कर रहे हैं।
    const timer = setTimeout(() => {
      setIsAppLoading(false); // लोडर को 2 सेकंड बाद छुपा दें
    }, 2000); 

    // क्लीनअप फंक्शन (Cleanup Function)
    return () => clearTimeout(timer);
  }, []); // <-- खाली एरे (empty array) इसे केवल एक बार चलने के लिए बाध्य करता है

  // 3. कंडीशन (Condition) चेक: अगर लोड हो रहा है, तो सिर्फ़ Preloader दिखाओ
  if (isAppLoading) {
    return <Preloader />;
  }

  // 4. जब लोडिंग पूरी हो जाए (isAppLoading: false), तो पूरा एप्लीकेशन रेंडर करें
  return (
    <HashRouter>
      <ScrollTo></ScrollTo>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/collection/:categorySlug' element={<CategoryCollection></CategoryCollection>}></Route>
        <Route path='/product-info/:id' element={<ProductInfo></ProductInfo>}></Route>
        <Route path='/product/:id' element={<RingsProduct></RingsProduct>}></Route>
        <Route path='/rings' element={<Rings></Rings>}></Route>
        <Route path='/earings' element={<Earing></Earing>}></Route>
        <Route path='/bracelate' element={<Bracelate></Bracelate>}></Route>
        <Route path='/daily-wear' element={<Dailywear></Dailywear>}></Route>
        <Route path='/collection' element={<Collection></Collection>}></Route>
        <Route path='/gift' element={<Gift></Gift>}></Route>
        <Route path='/nacklace' element={<Nacklace></Nacklace>}></Route>
        <Route path='/nacklace-set' element={<NacklaceSet></NacklaceSet>}></Route>
        <Route path='/nose-pin' element={<Nosepin></Nosepin>}></Route>
        <Route path='/bangels' element={<Bangles></Bangles>}></Route>
        <Route path='/add-cart' element={<AddToCart></AddToCart>}></Route>
        <Route path='/check-out' element={<Checkout></Checkout>}></Route>
        <Route path='/buy-now' element={<BuyNow></BuyNow>}></Route>
        <Route path='/wish-list' element={<WishList></WishList>}></Route>
        <Route path='/our-store' element={<OurStore></OurStore>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
        {/* Admin Routes */}
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;