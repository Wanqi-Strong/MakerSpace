import './layout.css';
function Layout(props){
    return(
        <div className="container flex flex_ver flex_center_all layout-box">
            <header>
                <div>header</div>
            </header>
            <main className='flex_1'>
                <div className="flex flex_center_ver">
                    <nav>
                        <div>navigation</div>
                    </nav>
                    <section className="flex_1">{props.children}</section>
                </div>
            </main>
        </div>
    );
}
export default Layout;