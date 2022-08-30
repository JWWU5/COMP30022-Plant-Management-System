import './Header.css';
import whiteMenubar from '../assets/images/menu_white_icon.png';
import greenMenubar from '../assets/images/menu_green_icon.png';

const Header = (menubarColour) => {
    if (menubarColour === "green"){
       return (
        <nav className='navbar_style'>
            <button><img src={greenMenubar}></img></button> 
        </nav>
        ) 
    }
    else {
        return (
            <nav className='navbar_style'>
                <button><img src={whiteMenubar}></img></button> 
            </nav>
        ) 
    }
    
}

export default Header