import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeApi } from '../apis/auth.api'
import '../assets/styles/home.style.css'
import yoga1 from '../assets/yoga1.png'
import yoga3 from '../assets/yoga3.jpg'
import yoga4 from '../assets/yoga4.jpg'
import yoga5 from '../assets/yoga5.webp'
import yoga6 from '../assets/yoga6.jpg'
import { Button } from '../components/atoms/Button.component'
import { NavBar } from '../components/atoms/navBar.component'
import { ApiWrapper } from '../utils/apiWrapper.util'

export const Home = () => {
  const navigate = useNavigate()
  const openEnrollment = () => {
    navigate('/enroll')
  }
  useState(() => {
    ApiWrapper(HomeApi())
  }, [])

  return (
    <div className="container1">
      <NavBar />
      <div className="section section1">
        <div className="sectionHalf w50 p2">
          <h1 className="h1">You Can Control What Goes Inside</h1>
          <p>
            “Yoga is the ultimate practice. It simultaneously stimulates our
            inner light and quiets our overactive minds. It is both energy and
            rest. Yin and Yang. We feel the burn and find our bliss.”
          </p>
          <span style={{ alignSelf: 'flex-end' }}>- Richard Freeman</span>
          <Button
            text="Get Started"
            handleClick={openEnrollment}
            customStyles={{
              backgroundColor: '#7a319f',
              width: '150px',
              marginTop: '1rem'
            }}
            borderRadius={'4px'}
          />
        </div>
        <div className="sectionHalf w50">
          <img src={yoga1} alt="Yoga" className="img" />
        </div>
      </div>
      <div className="section section2">
        <div className="sectionHalf al-center p2">
          <h1 className="h1 mw600 text-center">
            Practice wherever you want, whenever you want
          </h1>
          <p className="mw800 text-center">
            The success of Yoga does not lie in the ability to perform postures
            but in how it positively changes the way we live our life and our
            relationships.
          </p>
        </div>
        <div className="sectionHalf">
          <div className="flrow">
            <div className="type">
              <img src={yoga3} alt="meditate" className="rounded-img" />
              <h4 className="title">Prenatal Yoga</h4>
              <p className="desc">
                prenatal yoga is a multifaceted approach to exercise that
                encourages stretching, mental centering Yoga
              </p>
            </div>
            <div className="type">
              <img src={yoga4} alt="meditate" className="rounded-img" />
              <h4 className="title">Restorative Yoga</h4>
              <p className="desc">
                Restorative yoga is a passive, meditative form of yoga that
                allows you to focus on your breath while releasing tension in
                your body
              </p>
            </div>
            <div className="type">
              <img src={yoga5} alt="meditate" className="rounded-img" />
              <h4 className="title">Power Yoga</h4>
              <p className="desc">
                {
                  "Power yoga is a fast-paced style of yoga that's focused on building strength and endurance."
                }
              </p>
            </div>
            <div className="type">
              <img src={yoga6} alt="meditate" className="rounded-img" />
              <h4 className="title">Backyard Yoga</h4>
              <p className="desc">
                Outdoor yoga classes blend the safety and distance of virtual
                classes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
