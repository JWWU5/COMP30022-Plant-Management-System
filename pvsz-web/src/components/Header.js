import './Header.css';
import whiteMenubar from '../assets/images/menu_white_icon.png';
import greenMenubar from '../assets/images/menu_green_icon.png';

const Header = (menubarColour) => {
    const showMenubar = () => {
        <div className='menuRec'>
            <p>you</p>
        </div>
    }

    if (menubarColour === "green"){
       return (
        <nav className='navbar_style'>
            <button onClick={showMenubar}><img src={greenMenubar}></img></button> 
        </nav>
        ) 
    }
    else {
        return (
            <nav className='navbar_style'>
                <button onClick={showMenubar}><img src={whiteMenubar}></img></button> 
            </nav>
        ) 
    }
    
}

export default Header