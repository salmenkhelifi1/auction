"use client";
import React, { useState, useEffect } from "react";
import { IoMdPhonePortrait } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdStarRate } from "react-icons/md";

import { GiThorHammer } from "react-icons/gi";
import axios from "axios";
const Page = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [items, setItems] = useState([]); // Make sure items is initialized correctly
  const [data, setData] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/seller/profile/1`)
      .then((r) => setData(r.data))
      .catch((err) => console.log(err));
  }, []);

  const handleContactVendor = () => {
    setShowContactForm(true);
  };
  const handleSendMessage = () => {
    if (!name || !email || !message) {
      alert("Please fill in all the fields");
      return;
    }

    // Email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    alert("Email sent successfully!");

    setName("");
    setEmail("");
    setMessage("");
    setShowContactForm(false);
  };

  const handleSearch = () => {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setDisplayedItems(filteredItems);
  };

  // Use displayeditems to render your list in the UI

  const handleSort = () => {
    let sorteditems = [...items];

    switch (sortOption) {
      case "price":
        sorteditems.sort((a, b) => a.price - b.price);
        break;
      case "name":
        sorteditems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "category":
        sorteditems.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        break;
    }

    setItems(sorteditems);
  };
  const divStyle: React.CSSProperties = {
    position: "absolute",
    top: "90%",
    left: "50%",
    right: "50%",
    transform: "translate(45%, -50%)",
    width: "65%",
    height: "50%",
    background: "#f0f0f0",
    zIndex: 50,
    marginBottom: "50px",
  };

  return (
    <div>
      <div className="mt-[80px] bg-auto">
        <div className="w-[70%] ml-[5%] mb-[30%] grid grid-cols-[30%_60%]">
          <div className="mt-[20%]">
            <h1 className="text-[10px] font-[300] mb-[20%]">
              Store Product Category
            </h1>
            <h1 className="text-[#ff2800] font-[300] ">CARS</h1>

            {showContactForm ? (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 mb-2 rounded border border-gray-400"
                />
                <input
                  type="text"
                  placeholder="Address/Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 mb-2 rounded border border-gray-400"
                />
                <textarea
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 mb-2 rounded border border-gray-400"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  style={{ backgroundColor: "#ff2800", cursor: "pointer" }}
                >
                  Send Message
                </button>
              </div>
            ) : (
              <button
                onClick={handleContactVendor}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                style={{ backgroundColor: "#ff2800", cursor: "pointer" }}
              >
                Contact Vendor
              </button>
            )}
            <div>
              <img
                src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-sidebar_pic-922x1024.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="w-[150%] ml-[8%] h-[65%] mt-[15%] bg-white shadow-xl rounded-[20px] text-center relative">
              <img
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgVFhUZGBgaHBoYGBwaGhoYIRgdGBoaGhwaGBwcIS4lHB4tIRoYJjgmKy8xNTU1HCQ7QDs0Py40NTEBDAwMEA8QHhISHjQkJCQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQxNDQ0P//AABEIAOkA2AMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAECBAYDBwj/xABBEAACAQIDBQUGBAQFAgcAAAABAgADEQQhMQUSQVFhBnGBkaEiMrHB0fAHE0JyFFKy4SMzYoKic/EWJDQ1Q5LC/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAIDAQT/xAAgEQEBAQEAAgMAAwEAAAAAAAAAAQIRITEDEkEiMlET/9oADAMBAAIRAxEAPwDHxRRS6aL6QdtHE7ikDU5DpfO8JzN7XqhmsM93In5TK2KVspATrVyAH396SC6X8op66AC2fl85aVFUXPvH/j0A4mccOo95tB6n7+MnSQu1zpy5RfZvSDG+i36n6DSd6GBZznoISwmBuZoMJs8Iu82QGZMzWpD5z32y+IwG6tzqcgOJJlD+EYki3Iec2eGwm+7ORkuSg8ScwO85Z8Pa5S+NhKqlyfdu7G2psb2+XhF+/PYuO+mAqUSCFA45Rnokcbzc4fswz7zm2u5lzX3iD+64/wBsqYzsy44acc878f8AvyjzcJcWMUqZ+EcpkZpD2drA+6enQcz1ljDdmHJFxblxh94Ji1k2pSNSnN+nZEkm+UoY3s8VO76/2h98t+lYkrGmmrbGsLHXWAMTQKMQfCbLKW5scJdwLX3lOhF+4jj9/KUp1ovZgeXqOPpNKelcNb7yhDZRujDk9M/8pSrixY89Ot+PkPWW9mXBI5/ln/kPqfKbBRLDD/Ge3S/kJelPZ+bVH5tujwv/AGlwximMURigxKKKKAccXUKoxGtjbymTGvrNiy3md2jRAa4tqb245624f2mU0U6wzHX/ALfKQOthnO1VbZ9Mu8k/3j4NLuPPyziH/T18rLwUZ9WOv0hXY+HvnBFIbzZ8cz4zU7ITITNXkbmdols7DgMJbeqrhnP+TTuf+oy8Oq3t4waCazlEayDJ3H6uaIfiYS2nbdpUEAG8R7PJEz+O76yF9uielnY9E7gdtTdj+5sz5Xt3loVxThaZJHEZc7e1u+O7bxnDD5Cw0E61033oJzcuR0pqT/UVid7Tc5BvZ2G3EVDnYZ9TxJ7zeXFpjll3TkjzqrzOjjnVwqkAWFtR0lV6IEvs8pVWzmdbIgyDOC8dTEv1WMoV2OsDcBMZQFpje0GFy3hwPoZt8Sb3md2nRDK46S+L5Q+SeGInenSa+nC/hObCxl7DuoscwdOeuuUu5+KdUniLcfv0lrAPZweAW/lp62nOsLcbrwvkRwuPKdtlreovIDTnY3mxlH8LT3UA46nvP3bwnSTkYxUTFHMUGcPJSIkoNMIB2qN1rcSbnxA9NYfECbWpFnJtkB55fflMrZ7CqmZEs4Rc26KbeKsflK1Ii48/7S3g2Afd5/Qj5xKpHHB6w7g96p7CkhNHYatzVeXUwBh6ZJ3fAzYYCkFCgCwi7vhuJ2iuHRVChRYCwAHCctmsalV636QTTT9q6nxa58ZzxdUojuNQpt36D1tL+zMLuUkQcFF+ptmfOQvp0z2KUVj7N9uotXgd4J+xBu3H7mYnu3ZWALn8scffINt1OQ/1NmOgueUL0RaogAsAj5DhnTt84no1E1A5idKZvxkTwkkA5TGcO4lOuZeYDT6/WVKi/dz98pjYpVoPxLWl+trlpBeKMIbijiNIExJ94dIXxDC0BYprXlsI7ZOqgDkHS/xGU5ByMp1xdw55/ETi+YB8D4aenwnS5ExVJIvwFvUn4mFtk7PuhYkgn3SMiAOP3yg7CoDYMfZDZgWv3900KK2i5Drw7hGjLUqTODuv7Q4OMr24MOB7p2jgWFo01iMURigEpKRigDiUtor5EZ+EvTjjUuhPEEet7xdem5nazlTD7rixuCCQR3Tg7ENeH62CH5YqgZWz8Rb4wFVXOJL1SzghsejvPc87zX01yEzWwbKSDfgw9knIjoDymjStZclYnu3f6rSe75VxyQ2OXe3E4s4/4Xf/APMJpUuSie04tvHUJ1bm3+n4TNVMcTUXeyAD+yp6AZt3E6AQ9hNooqjdXdGWQHx5yes1Sa8jmDwwRbZ55sTqWOpP3ylnDn/EFjluH1YaeUHJtpCM8j1nOjtNGcEMPd+DD6xPrTfaNYgBtn6yVvu8DUdoiwz+Bl/+IEwLIBPE+n0kHTrOQxIA5yD4m4+88oNcK6ZG3GB8ZCVfEiC653jCRvQ2qcoExnE8ofxVP0gXGLcGWwltj8Yfa9JHD0Sx3eYv5SFY5nvMvbKF2Clbjnp6+c6Y5K6YHBMWJVt0aX1uBra4zzhvDUAgsDlOgHC0lGKYyMkZEwCJiiigxKKKKA6Ut4Klv3XmQD3ENeVIT2KBv3OlwPMMJP5P61T4f7QAq1WRHw7ZgElTzF7/ABgZRcnz9JtcbsoO7Z2ZbkfSYk+y5B4bwPiMomL1beeUd2KM0PTdPcVv8QPOGsQuRGkH9n6Z3VHK1/vymmfBhl4+EnrXNKZn8WOVV3xc/pbPxEI/xFED2nC26/d5R2ls9g9hcZX79ZUwezKZJ323Sb5nh1jyTX6S25/FzFYvDnJaxv1Un4CDa194br66ar6mdqexK+aD3Cbk+zY243OYGUObR2DTVECON6wuMyCQOVtTG8ZJO2+grA7RdGAZiBy1vNjgNpBwACeF+4TLrsclWN7hfI8it+E0vZjZ3s5AXkt/XnVsywZxOJCqYCxG3ABmwlvtKHRDdTa2onm9SnUcg89BxPlMxma9t1r6tRie0yDjeNhttX0HdMyKDI+4yqrWuS9lAyv1znfC7R1vSUgZErlK345xH73/AEfxO2Dra2UpUsXv3nBsVScZXB5TlgEO90OsyZkjbaBYxLOw6maDY1O1Nb8yYNxFHerhbfqB8LXmgRAosJbLn0lFIkx4zCMjHMjAGiiMUAcRRRQYeFNjqGDqTa9iPCCpYwdXccHhofGJudzT/HealF8Y7A74GgAbr1mC2stqzNbJjccfvhPR6zezcZg69e+Yfb2GJci1st4cbd0h8ddfyzwL9nnHhlabPDU8p572dewzm5wGKyzk/knluPShtvDgVKTXyN1PjYD+oylU2KWvZbi+kM7ap79MMNVYEngAfZJ8L38JfwtIMFcEjeUNbkeIPdcDwhNWSNsnWWTZtv8A435WBYDyhPC7NZsgoQdMyZof4c8Tfl1nVUCgmF3RMs0cCFun8p56q2YPpbwhjYK7p5SpjhchhmRfxBtcffKWNnuMmHeDzi29NJzwXbABqbDPS0ymBpbi73tXvmRoOGluU2HaEXpmANmrdba5Z/CNm8hbnodtXD0qlncOGtYsihgbabw59YPb+HSmUVHYn3iRa5+U0tfZ3FCR04SjV2U7HMiUzsmsMnhNnl3yFhwHLxmjXAqi6Q1svZQTMzntXdVTMu/teNmZIxH5ZOIvwGviIUkFpgd59on0AkzOnPpybnKgY4MYyUYpSEeNAGMURigCiiigwo8aKDF3DYwojgkm4XcBJsCHQn/iGHjKO0cRvlW3bXH947C4tIVxkO+T1me1c716rlsqnulus0OFrWygOktjeFaTXseMjry6ceBym++pU5hgVI6HI+kXZ3FEB6L33qT+avx7ibt4iUcLVzk653MRTrg2Vx+TU5C59h//ALWXxEnz8Ut/W1TS9uk4YrJSeUjh691Hr85T2niLKSDEaG1cTnaLB19w736Cfa/0E/q/aePLXnbmlVFAJMu4WmpI3SLcesfnGiO10BpnumW2S93I5GaLajbibl8iCFPLL3D8vLlfPbJphXBvmRY/KEnil/Y0qUweET0lEVJrStin48dPOTObEVwsy228VfIccpb2jirXzmbbEb1VeIGflK4z+pb1IttoMrayF4RxDqKZVgPbSnUQg5o28VYHncBsugMGTqz6cW73Xgooxjx2FIxzGgCMUYxQBR7xooMPeKNHEAeRq6eUlI1B7J7pl9Nnt2RMhLmHbTKV8Ot0vO+HTXznNXZlbXWXAiOjI+YYWNssjyPA/SU0FzLNI2OsnTxe2Li2IKOfbQ7j9crq/wDuFj4mXsbhC6HO1/CBz7FZKnB7Un9SjHxuv+6HcRjUVDcjK/p9iZ++DdeebS2fiN7NmS2hBupkcLtipRyfUaEXsfDhCm0tqXQ2zN+/x6QDUqbxAtlbPjfIk3l8+Z5Q1rl8CeM7TCqhB5aDOP2baozbz6cOveZnmUB+APSbLs/UV13dCM/oRM1JnPhuNfbXlpFqZQdtDE2E7u43eo1tAO1K2slmdq2ryBuLrbxOco4O+8zi38ov6yWKqWWdMIlkHn5zpxHJ8ldRfibxRRSqJoo0UAeMTFGgDGKMYoBKKIRXgCjxo4MGHiC3yAvfLzjXmu2Zsc0aX5zj/EYewD+hf5j1tAM1ggVJRhZlyI7pao2vn1lOrWBqsy3OeZP6j/N07paD8ZzanK68a7Fuj71pYWwOenWUUfOc9qYwqmuZ4ciePxk+dqv25Oo7W2yCjIul1sf2kG/mIN/jnrNujO/pb6mUqODeochfPnaEsPsOsAfbVedhcmV5nKP8tVxp0902d+pGufAmEOz2Bpm7OwtmGBysG5dNJKl2Ydrn8xh4CLEdm6wAtVBHdC2Xx08xwH2lhUFX2G3l3su6c9n49qNS+ds50rYOomdwx8jwlbEjeUkgq3EHnzje5xLU5extFxodN4EcvGAsXXzlPYldtxgdBJYl8yeXxiTPKe67nqtVuxt1t5whOGEwjNvOBkgBbvbIeU7Xl8zw593yUUUUYpoojFAFGjkyMAYxRjFAJRQPU2yf0r5mVX2lUP6rdwgONETacnxaLqy+czL1GbVie8wr2Y2E+MxCUFuAc3a3uqNT8h1MG8ehfh9sVcQ38QwvTQ2S4ydxx6gfHuhbtriiFIHHLwm1w2CWhSWjTUKqqFAHIfOYTtqnsnzk+9ok8sPgKV949xlxVtJbNp69wlipSk9X+XF8zx1wOs4YmjvMOJHCdS4GRligobQRb4PLK7YQBMuHCWnxyqOZ5mQpYYNrOj7OQixF+kn2d8qeVKtt9R7o85y/8Qh8rAShtfZe4CRxz8NIO2Zs9na4FxxHz+MrJnnU/tqXg2lUOTukfGcsdh1Iz5Zy5T2buLdf+041qBItfv8A7Re+fBrL+gWE9gsRobx3OnmfkJaxFMDIeMfY+ENbEKmuas3S7AAfE+ErPNR1/GNpgNnCjRQHVhdzzL/LQeExS1VYtu8GZbcrEiepdp0VKVzkFX4TxLZOK/xWB0clvG95aenP/o5GMeNBpExXjRQBGRMcyJgDGKNFAMvaK0eNAJUqZZgqglmICgakk2AHjPofsD2WXA4cbwBruA1RuvBAf5RfxNzMJ+EPZgVHONqD2EJWkD+ptC/hoOt+U9iLXMnrX42Iut5hu2dG5C9DN2Jmu02FuQYsNPbznCC2XLIy6yZThWstR145H78jLFI5Sev7OjHoNxuGyvBaY4o27yOffNLUS4mb23gyAXXxHpNzZfFLqWeY0mz8cpPgPp8pfOLT1sD1H1nm2G2iyWF+P3f74S3T2kSeWlj3Cx8bwvw+RPmbjFblQZnhmNPXhKWDREOXu5fQDumco7RtlfK+fpp5TlU2s29cG+efI8svOExfTb8k9thicUtt0awNiMVqL6C44X6d8o0cWd27HW59Db4H0lNSzsScuh5EWHz8oT4+e2X5LrxFuu9hfnmP7zW/hbsve367DNnAHcin5tMjQwrVHVFGbGw+ZPQT2vslsxaNFEA0ufhn6Sk8RPfjwy34s4rcwzAavZB46+l54hSqFWDDUG4nqH404y70qQ/1OfCwHxM8tlM+k41mHrB1DDj6dJ0MzODxjUzlmOIMNYbaKPxseR+U1i1FFFAGkTJGRMAaKKKAZgxksSLmwuLnkIxjGAfRmwt2hUbDq3sKi7iaABfe3Rzsb31NjNCGzyNwcxMCuIYmjiEOZp03XlnTFwehzB75sMPXHsFc0dd5Dy5qe6T1GwUpiD9t0wUJPDPyl5H5C8pbTXeRieWQ4D6xGx5BjK29iqg4AKviQT85apPaVGAbFYgj+YW/2kr8p3ZrH4xNe3T8fpZqHjKFcXl1GBE4VkiRSxnsXs5Wz0PSUzs3LXPh0vrNHUSVnSVmqlcQBq4I8GN5zTCsNBfhmfWHTh5EYYaxvuz/AJxQw1Bv1H4cZfSmMzw+PSSNMDOafsn2faswqutkGaA/q6npM7dCzOZ0V7GbCKr+c49phl0HAT0Kgu6ncJSCBVCgWtaWNoVglB3P6UY+Sxr/AIhb29eAfiVjvzcdUsckCoO+1z8ZlJYx+JNSq9Q6szN5nL0nECVhUbRWkrRAQCzhse6ZXuORhOhtRGyPsnrp5wHaMRANSrA5g3jGZqlXZfdYj75Qlh9rDRxbqPpACJikadVWF1IMUAzMUcxrQD2LsNiBXwVK5uaTGkw7rlL9N1h5QxsraBp1Qj50zfI6ISdR855R2L7Q/wAJWO/c0allqAZ2/lcDmufeCZ6vjaAZVdCGVhcMuYIOhB4xbPwNurctOko7Vq7qNlqPhn8oG7L7XDMcM7e2q76f6kBAYD9pI8D0l3tM1qTk6bj6Wv7pGVyJOzlNHmGGp/8AmMgQGDa63DXz65mEcbg+IlCgm69E9Svmp+gmjdbic+r5dmM/gBhk4Tq9CWlpbraazsacz7H4EPQM5tRhV6PKcfyZv2Z9Q8YcnhOdSlbWE3WwnDZ+znxVYU0yXV2/lX68hGz5ZrxOl2d2E+JqBiLUkYb5I943HsDn1nqVNAgCqLTlSwqUUSmi2VB8OJ5m84HEqFd2YIii7Mx3UXmWY/CXzHFrX2q7hzvvloDBX4l4z8rZ9cg2LLuD/eQvzmX7Q9qy6/k4Ysqfqqe6z9EGqr11PTiI7TbSqPsorVcsfzUVCTdiB7ZBPEDnG+t70rzESYkRJiODxhHkRGB40eKANaRIko0AZWIzBt3RRWiig8YyUYxggZsexvbRsLajWBqYcnvanfUpzXmvl1x5jWi2Ne30qCNiaGMoOGRVdlKnI7w3Sp89DNH2rrg4RnXQrlwybwP3ymG/DzZz0xiFqE7wZUK3yU7gbuvZlufpNRtimxwVVBc7pDC38t7ngchYn6ayWvM62eLxjcSj7iFEZ2DKd1BvMbEE2HdeaSg1wDbw0I8IM2PtenhnFStkgUi4F7aa26Azs3aHD1X3kcAObIDkSeJtwHfObUtnp2S8tjtWTO9pFlvOtQZSKX0iKxzNOQena8tINZWrPwEAovSZ2CKLsxsAOc9C2HstMPTCixY5u3M/QQZ2Z2WEH5rj2z7oP6QePeYexmLSlTZ3YKqglieE6MZ5OuP5t/a8jOdqO01PCIXdS+84RUBsX4tY8AOPgOM8xxXaHEbRrrTeyUlbeWkmSKBpf+dtMz4WgjtTt9sXiGqE7qLdaS67qg8eG8TmT9BNv2C7PlKW+63d/asf0rwvy/vLycRp6ezCbADM6CBPxFrhUoYYai9Vhy3vZW/UgE+Imy2/tmhgULOQ9Zh7NMHM8t7+VL6njoJ45j8Y9ao9Wo28zneY/IcgBkByEbvWRXEmJFRJxgUYR40AUUUUAaKIxjAFFFFAJRjHjCANOmGtvrfS9jbLXK8hOuB/zF8f6TF16bPb2bsLgzTwSG4ZmdmLa3ubA345AQxtUkYasCQWRDmL2K7u9na17WI+Mpdiv/b8N+1f6pcr/wCVX/Y/9DSTP15RVp4ioSAWtobEAWztl3S52X2M28WewI0trbl0ORhbB+6O4TpsT3n/AHH+tpDWrx2zM+0HlXh9+cYr4TqfrOLyK6ltHaKUVDMCbm2QvIdk9oDFYkbiMFpgu7MBYahRrmxPlYyj2l/yj3wj+EPuYr/qL/RL/HmVz/Nq59PQGFh6noJ41+IHaz+KZ6FJh/Dpclr2FV1IPs8wM7Djrynqfav/ANLiv+lU/oafOj/5afuf4JLSOSNJ2V2bh93+LxT7lJGIUHM1GGYCqMzb70hTbf4kVGU08In5KabxsznuGi+p7p5+3zPyiEf2HWtVZ2LOxZmNyzEkk8yTrGAjCTEbgKK55RzFBhrHnEBHERgDGNHjGMDGPaMY8AaKPFAP/9k="
                alt="seller"
                className="rounded-full mx-auto mt-6 w-[100px] h-[100px]"
              />
              <div>
                <p>JOHNNY DEEP</p>
              </div>
              <div className="flex items-center justify-center mt-4">
                <MdLocationOn color="#ff2800" /> <p>EL KEF</p>
              </div>
              <div className="flex items-center justify-center mt-4">
                <IoMdPhonePortrait color="#ff2800" /> <p>27348509</p>
              </div>
              <div className="flex items-center justify-center mt-4">
                <MdEmail color="#ff2800" />
                <p>johnny@gmail.com</p>
              </div>
              <div className="flex items-center justify-center mt-4">
                <MdStarRate color="#ff2800" /> <p>5 on 5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={divStyle}>
        <h6
          className="text-[15px] text-center font-[600] mb-[30px] text-gray-600 shadow-md bg-white p-2 rounded"
          m-bottom="0px"
        >
          PRODUCTS
        </h6>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[100px] p-1 mb-1 rounded border border-black-200 mr-2"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-2 py-1 rounded"
              style={{ backgroundColor: "#ff2800", cursor: "pointer" }}
            >
              Search
            </button>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">
              Sort by:
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="ml-2 border rounded p-1"
              >
                <option value="">None</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
                <option value="category">Category</option>
              </select>
            </span>
          </div>
        </div>
        <div className="flex flex-wrap justify-evenly gap-8">
          <div className="w-[200px] h-[260px] mb-8 shadow-xl rounded-[10px] bg-white flex flex-col justify-between items-center p-4 hover:transform hover:-translate-y-1 hover:shadow-2xl transition-transform duration-300 ease-in-out">
            <div style={{ position: "relative" }}>
              <img
                className="w-[200px]"
                src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ2.png"
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-30px",
                  left: "90%",
                  transform: "translateX(-50%)",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <GiThorHammer />
              </div>
            </div>
            <div className="text-center">
              <h1 className="font-[800] text-[25px] mb-2">SUV</h1>
              <h4 className="mb-2">2015 · 97 900 km · 2 494 cm3 · Hybrid</h4>
              <h6 className="mt-0">Starting Bid:</h6>
              <h2 style={{ color: "#ff2800" }}>2500$</h2>
            </div>
          </div>
          <div className="w-[200px] h-[260px] mb-8 shadow-xl rounded-[10px] bg-white flex flex-col justify-between items-center p-4 hover:transform hover:-translate-y-1 hover:shadow-2xl transition-transform duration-300 ease-in-out">
            <div style={{ position: "relative" }}>
              <img
                className="w-[200px]"
                src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ1.png"
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-30px",
                  left: "90%",
                  transform: "translateX(-50%)",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <GiThorHammer />
              </div>
            </div>
            <div className="text-center">
              <h1 className="font-[800] text-[25px] mb-2">Sedan</h1>
              <h4 className="mb-2">2015 · 97 900 km · 2 494 cm3 · Hybrid</h4>
              <h6 className="mt-0">Starting Bid:</h6>
              <h2 style={{ color: "#ff2800" }}>1500$</h2>
            </div>
          </div>
          <div className="w-[200px] h-[260px] mb-8 shadow-xl rounded-[10px] bg-white flex flex-col justify-between items-center p-4 hover:transform hover:-translate-y-1 hover:shadow-2xl transition-transform duration-300 ease-in-out">
            <div style={{ position: "relative" }}>
              <img
                className="w-[200px]"
                src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ3.png"
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-30px",
                  left: "90%",
                  transform: "translateX(-50%)",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <GiThorHammer />
              </div>
            </div>
            <div className="text-center">
              <h1 className="font-[800] text-[25px] mb-2">Sports</h1>
              <h4 className="mb-2">2015 · 97 900 km · 2 494 cm3 · Hybrid</h4>
              <h6 className="mt-0">Starting Bid:</h6>
              <h2 style={{ color: "#ff2800" }}>2800$</h2>
            </div>
          </div>
          <div className="w-[200px] h-[260px] mb-8 shadow-xl rounded-[10px] bg-white flex flex-col justify-between items-center p-4 hover:transform hover:-translate-y-1 hover:shadow-2xl transition-transform duration-300 ease-in-out">
            <div style={{ position: "relative" }}>
              <img
                className="w-[200px]"
                src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ4.png"
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-30px",
                  left: "90%",
                  transform: "translateX(-50%)",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <GiThorHammer />
              </div>
            </div>
            <div className="text-center">
              <h1 className="font-[800] text-[25px] mb-2">Convertible</h1>
              <h4 className="mb-2">2015 · 97 900 km · 2 494 cm3 · Hybrid</h4>
              <h6 className="mt-0">Starting Bid:</h6>
              <h2 style={{ color: "#ff2800" }}>2300$</h2>
            </div>
          </div>
          <div className="w-[200px] h-[260px] mb-8 shadow-xl rounded-[10px] bg-white flex flex-col justify-between items-center p-4 hover:transform hover:-translate-y-1 hover:shadow-2xl transition-transform duration-300 ease-in-out">
            <div style={{ position: "relative" }}>
              <img
                className="w-[200px]"
                src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ7.png"
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-30px",
                  left: "90%",
                  transform: "translateX(-50%)",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <GiThorHammer />
              </div>
            </div>
            <div className="text-center">
              <h1 className="font-[800] text-[25px] mb-2">FAMILIAR</h1>
              <h4 className="mb-2">2015 · 97 900 km · 2 494 cm3 · Hybrid</h4>
              <h6 className="mt-0">Starting Bid:</h6>
              <h2 style={{ color: "#ff2800" }}>1700$</h2>
            </div>
          </div>
          <div className="w-[200px] h-[260px] mb-8 shadow-xl rounded-[10px] bg-white flex flex-col justify-between items-center p-4 hover:transform hover:-translate-y-1 hover:shadow-2xl transition-transform duration-300 ease-in-out">
            <div style={{ position: "relative" }}>
              <img
                className="w-[200px]"
                src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ5.png"
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-30px",
                  left: "90%",
                  transform: "translateX(-50%)",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <GiThorHammer />
              </div>
            </div>
            <div className="text-center">
              <h1 className="font-[800] text-[25px] mb-2">CLASSIC</h1>
              <h4 className="mb-2">2015 · 97 900 km · 2 494 cm3 · Hybrid</h4>
              <h6 className="mt-0">Starting Bid:</h6>
              <h2 style={{ color: "#ff2800" }}>1300$</h2>
            </div>
          </div>
          <div className="w-[200px] h-[260px] mb-8 shadow-xl rounded-[10px] bg-white flex flex-col justify-between items-center p-4 hover:transform hover:-translate-y-1 hover:shadow-2xl transition-transform duration-300 ease-in-out">
            <div style={{ position: "relative" }}>
              <img
                className="w-[200px]"
                src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ6.png"
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-30px",
                  left: "90%",
                  transform: "translateX(-50%)",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <GiThorHammer />
              </div>
            </div>
            <div className="text-center">
              <h1 className="font-[800] text-[25px] mb-2">4*4</h1>
              <h4 className="mb-2">2015 · 97 900 km · 2 494 cm3 · Hybrid</h4>
              <h6 className="mt-0">Starting Bid:</h6>
              <h2 style={{ color: "#ff2800" }}>3200$</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
