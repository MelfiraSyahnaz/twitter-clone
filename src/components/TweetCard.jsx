"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import moment from "moment";

export const TweetCard = ({ id, content }) => { 
  const router = useRouter();
  const [onEdit, setOnEdit] = useState(false);
  const [recentTweet, setRecentTweet] = useState(content);


  async function handleDelete() {
    await fetch(
      `https://devscale-mockapi.fly.dev/api/collections/notes/records/${id}`,
      {
        method: "DELETE",
      }
    );
    router.refresh();
  }

  async function handleCancel () {
    setRecentTweet(null);
    setOnEdit(false);
    setRecentTweet(content)
  };

  async function handleUpdate() {
    const res = await fetch(
      `https://devscale-mockapi.fly.dev/api/collections/notes/records/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: recentTweet }),
      }
    );
    const data = await res.json();
    setOnEdit(false);
    router.refresh();
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="my-6">
      <div className="card border-y border-b-0 border-gray-500 w-full ">
        <div className=" mx-auto max-w-2xl p-4 flex justify-between ">

          <div className="flex flex-row space-x-4">
            <img
              className="rounded-full"
              src="https://via.placeholder.com/150"
              alt="profile"
              width={50}
              height={40}
            />
            <div className="flex flex-col">
              <div className="flex space-x-2">
              <h1 className="text-base font-bold text-white">
              Melfira Syahnaz
              </h1>
              <p className="text-zinc-600 text-base">@prettyjacccc</p>
            </div>
            <div>
              <div>
              {onEdit ? (

                <div className="flex flex-row space-x-4">
                  <input value={recentTweet} onChange={(e) => setRecentTweet(e.target.value)} className=" p-2 border-b-2  bg-black text-white " /> 
                <div className="flex space-x-2  ">
                  <button className="text-sm  bg-blue-800  p-2 rounded-full" onClick={handleUpdate}>
                    Update
                  </button>
                  <button className="text-sm  bg-red-800  p-2 rounded-full" onClick={handleCancel} >
                    Cancel
                  </button>
                </div>
              </div>

                ) : (
                <div>{recentTweet}</div>
              )}


              
                

              
               
              
            </div>
            </div>
            </div>
            
             
          </div>
            
          <div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5  text-sm font-semibold text-gray-900 ">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="white"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </span>
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )} onClick={() => setOnEdit(true)}

                        >
                          Edit Tweet
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )} onClick={handleDelete}
                          >
                          Delete Tweet
                        </a>

                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>

    
  );
};
