import { ImagesData } from './components/ImageSlider/ImagesData'
import ImageSlider from './components/ImageSlider/ImageSlider';
import Query from './components/Query/Query'
import FunctionBox from './components/FunctionsBox/FunctionBox'

const StudentHome = () => {

    const myStyle = { width: '100%' }
    return (
        <div className='container flex flex_ver flex_space-around'>
            <h1>Welcome to MakerSpace</h1>
            <div className="flex flex_center_ver flex_space-around" style={myStyle}>
                <ImageSlider slides={ImagesData} />
                <Query />
            </div>
            <div>
                <FunctionBox />
            </div>
        </div>
    );
};

export default StudentHome;