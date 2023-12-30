

const Footer = () => {
  return (
    <div>
      <div className=" font-openSans bg-gray  my-auto text-white h-20 100vh left-0 bottom-0 right-0 pb-14 mt-auto">
      <img src={require('./img/TranscertLogo.png')} alt="logo"/>
        <ul className="flex flex-row px-12 justify-around">
          <li>
            <a href="">Contact Us</a>
          </li>
          <li>
            <a href="">Terms of service</a>
          </li>
        </ul>
        <div className="mt-6 text-center flex flex-row  mx-auto justify-center">
           <p className="font-light text-sm"> Copyright 
           </p>
            <i className="fas fa-copyright ml-1 mt-1" /> 
             <p className="ml-1 font-light text-sm">
              2023 Transcert
              </p> 
        </div>
      </div>
    </div>
  );
};
export default Footer;
