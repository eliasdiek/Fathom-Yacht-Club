import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Times } from '../icons';

export default function MyModal(props) {

  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto bg-background-overlay z-50"
          onClose={props.closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title as="div" className={`flex items-center ${props.title ? 'justify-between' : 'justify-end'}`}>
                        { props.title && <div className="flex">
                            <h4 className="text-xxl ml-2 text-center">{props.title}</h4>
                        </div> }
                        <div>
                            <button className="rounded-full p-2 hover:bg-gray-200" onClick={props.closeModal}>
                                <Times />
                            </button>
                        </div>
                    </Dialog.Title>

                    {props.children}
                </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
