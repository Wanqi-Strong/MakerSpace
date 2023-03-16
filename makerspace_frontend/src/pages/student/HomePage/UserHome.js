import ImageSlider from './components/ImageSlider/ImageSlider';
import { ImagesData } from './components/ImageSlider/ImagesData';
import Query from './components/Query/Query'

const UserHome = () => {

    return (
        <>
            <div>
                <h1>Welcome</h1>
                <div className='container mt-5'>
                    <div className="styleContainer flex flex_center_ver flex_space-between">
                        <ImageSlider slides={ImagesData} />
                        <Query />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserHome;