import React, {Component} from 'react';
import './Carousel.css';
import image1 from './img1.jpg';
import image2 from './img2.jpg';
import image3 from './img4.jpg';




let slideIndex = 1;

class carousel extends Component {

  componentDidMount() {
    this.showSlides(slideIndex);
  }


  plusSlides = (n) => {
    this.showSlides(slideIndex += n);
  };

  currentSlide = (n) => {
    this.showSlides(slideIndex = n);
  };

  showSlides = (n) => {
    // const i=0;
    const slides = document.getElementsByClassName("mySlides");
    console.log(slides, 'slides');
    const dots = document.getElementsByClassName("dot");
    console.log(dots, 'dots');
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
      slideIndex = slides.length
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  };


  render() {

    console.log('suraj');
    return (
      <React.Fragment>
        <div className="slideshow-container">

          <div className="mySlides slide">
            <div className="numberText">1 / 3</div>
            <img src={image1} className="imgWidth" alt='oops'/>
            <div className="text">Sunrise</div>
          </div>

          <div className="mySlides slide">
            <div className="numberText">2 / 3</div>
            <img src={image2} className="imgWidth" alt='oops'/>
            <div className="text">Mushroom</div>
          </div>

          <div className="mySlides slide">
            <div className="numberText">3 / 3</div>
            <img src={image3} className="imgWidth" alt='oops'/>
            <div className="text">Flower</div>
          </div>

          <a className="prev" onClick={() => this.plusSlides(-1)}>&#10094;</a>
          <a className="next" onClick={() => this.plusSlides(1)}>&#10095;</a>

        </div>
        <br/>

        <div style={{textAlign: 'center'}}>
          <span className="dot" onClick={() => this.currentSlide(1)}/>
          <span className="dot" onClick={() => this.currentSlide(2)}/>
          <span className="dot" onClick={() => this.currentSlide(3)}/>
        </div>
      </React.Fragment>
    )
  }
}

export default carousel;