import AllProducts from './component/AllProducts';
import Banner from './component/Banner';
import FallPrice from './component/FallPrice';
import Marquee from './component/Marquee';
import Pricerise from './component/PriceRise';

export default function Home() {
  return (
    <div>
      <div className="bg-gray-100">
        <Banner></Banner>
        <Pricerise></Pricerise>
        <FallPrice></FallPrice>
        <AllProducts></AllProducts>
      </div>
    </div>
  );
}
