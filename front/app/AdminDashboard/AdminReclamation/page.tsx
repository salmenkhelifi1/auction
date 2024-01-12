import React from 'react'
import SideBare from '../AdminSidebar/page'
const Inbox = () => {
  return (
    <div  className="flex-row lg:flex">
    <SideBare/>
    <div className="container mx-auto mt-4 lg:mt-12">
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
   
<main className="flex w-[100%] h-[10%] shadow-lg rounded-3xl ml-[5%] mt-[-2%] ">
  
    <section className="flex flex-col pt-3 w-4/12 bg-gray-50 h-full ">
      <label className="px-3">
        <input className="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
          placeholder="Search..." />
      </label>
      <ul className="mt-6 overflow-y-scroll" >
        <li className="py-5 border-b px-3 transition hover:bg-indigo-100">
          <a href="#" className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Akhil Gautam</h3>
            <p className="text-md text-gray-400">23m ago</p>
          </a>
          <div className="text-md italic text-gray-400">You have been invited!</div>
        </li>
        <li className="py-5 border-b px-3 transition hover:bg-indigo-100">
          <a href="#" className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Akhil Gautam</h3>
            <p className="text-md text-gray-400">23m ago</p>
          </a>
          <div className="text-md italic text-gray-400">You have been invited!</div>
        </li>
        <li className="py-5 border-b px-3 transition hover:bg-indigo-100">
          <a href="#" className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Akhil Gautam</h3>
            <p className="text-md text-gray-400">23m ago</p>
          </a>
          <div className="text-md italic text-gray-400">You have been invited!</div>
        </li>
        <li className="py-5 border-b px-3 transition hover:bg-indigo-100">
          <a href="#" className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Akhil Gautam</h3>
            <p className="text-md text-gray-400">23m ago</p>
          </a>
          <div className="text-md italic text-gray-400">You have been invited!</div>
        </li>
       
      </ul>
    </section>
    <section className="w-6/12 px-4 flex flex-col bg-white rounded-r-3xl">
      <div className="flex justify-between items-center h-48 border-b-2 mb-8">
        <div className="flex space-x-4 items-center">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img src="https://bit.ly/2KfKgdy" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg">Akhil Gautam</h3>
            <p className="text-light text-gray-400">akhil.gautam123@gmail.com</p>
          </div>
        </div>
        <div>
          <ul className="flex text-gray-400 space-x-4">
            <li className="w-6 h-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
              </svg>
            </li>
            <li className="w-6 h-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </li>

            <li className="w-6 h-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </li>
            <li className="w-6 h-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </li>
            <li className="w-6 h-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </li>
          </ul>
        </div>
      </div>
      <section>
        <h1 className="font-bold text-2xl">We need UI/UX designer</h1>
        <article className="mt-8 text-gray-500 leading-7 tracking-wider">
          <p>Hi Akhil,</p>
          <p>Design and develop enterprise-facing UI and consumer-facing UI as well as
            REST API
            backends.Work with
            Product Managers and User Experience designers to create an appealing user experience for desktop web and
            mobile web.</p>
          <footer className="mt-12">
            <p>Thanks & Regards,</p>
            <p>Alexandar</p>
          </footer>
        </article>
       
      
      </section>
      <section className="mt-6 border rounded-xl bg-gray-50 mb-3">
        <textarea className="w-full bg-gray-50 p-2 rounded-xl" placeholder="Type your reply here..." rows="3"></textarea>
        <div className="flex items-center justify-between p-2">
          <button className="h-6 w-6 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-xl">Reply</button>
        </div>
      </section>
    </section>
  </main>
      </div>
       </div>
       </div>
  )
}

export default Inbox