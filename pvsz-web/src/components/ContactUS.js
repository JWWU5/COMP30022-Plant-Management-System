import Header from './Header';
import './About.css';
import zombieHead from '../assets/images/zombie.png';

const ContactUS = () => {
  return (
    <body>
        <Header />
        <main>
            <div class="body">
                <div class="title">
                    <h1>Contact Us</h1>
                </div>
                    <div class="rectangle"></div> 
                    <div class="contentBox">
                        <div class="content">
                            <p>Feel free to contact us and give us any feedback or advice.</p>
                            <h3>Email</h3>
                            <p>team@PvZ.com</p>
                            <h3>Facebook  Instagram</h3>
                            <p>@PvZ</p>
                            <h3>Contact Number</h3>
                            <p class="last_line">+61 452123456</p>
                        </div>
                        <div class="img">
                            <img class="zombieImg"src={zombieHead}></img>
                        </div>
                    </div>
            </div>
        </main>
    </body>
    )
}

export default ContactUS