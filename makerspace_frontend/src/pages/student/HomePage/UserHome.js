import PicSlider from "./components/PicSlider";

const UserHome = () => {
    const pics = [
        {url: 'http://localhost:3000/MakerSpaceHome.jpg', title: 'MakerSpaceHome'},
        {url: 'http://localhost:3000/MakerSpaceInfo.jpg', title: 'MakerSpaceInfo'},
        {url: 'http://localhost:3000/MakerSpace.jpg', title: 'MakerSpace'}
    ]
    const styleContainer = {
        width: '250px',
        height: '180px',
        margin: '20 auto',
    }

    return (
        <div>
            <h1>Welcome to MakerSpace</h1>
            <div style={styleContainer}>
                <PicSlider pics={pics} />
            </div>
        </div>
    );
}

export default UserHome;