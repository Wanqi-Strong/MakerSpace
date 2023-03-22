import ImageSlider from './components/ImageSlider/ImageSlider';
import { ImagesData } from './components/ImageSlider/ImagesData';
import Query from './components/Query/Query'
import FunctionBox from './components/FunctionsBox/FunctionBox'

const UserHome = () => {

    const myStyle = { height: '50%', width: '100%' }
    return (
        <>
            <h1>Welcome to MakerSpace</h1>
            <div className="flex flex_center_ver flex_space-around" style={myStyle}>
                <ImageSlider slides={ImagesData} />
                <Query />
            </div>
            <div>
                <FunctionBox />
            </div>
        </>
    );
};

export default UserHome;