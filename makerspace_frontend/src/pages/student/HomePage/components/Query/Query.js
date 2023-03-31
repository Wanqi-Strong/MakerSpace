import './Query.css'
import profie from './image/emk.png';

const Query = () => {
    return (
        <div className='cardContainer'>
                <h1>Any Question?</h1>
                <div className='container flex'>
                    <div className='flex flex_left_ver'>
                        <img src={profie} width={200} height={200} alt="manager profile"></img>
                        <div>
                            <h2>Eileen Kennedy</h2>
                            <h4>Library Digital Experience Developer </h4>
                            <p> MakerSpace, 3D printing, Technology, Web design & UX</p> 
                                <p>Twitter @eileenMaKe</p>
                                <p>Contact: T 091 492549</p>
                                <p>Email: eileen.kennedy@universityofgalway.ie</p> 
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Query;