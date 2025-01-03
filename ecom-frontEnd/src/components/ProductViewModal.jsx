import {Button,Dialog,DialogBackdrop,DialogPanel,DialogTitle,} from '@headlessui/react';
import { Divider } from '@mui/material';
import { MdClose, MdDone } from 'react-icons/md';
import Status from './Status';
  
export default function ProductViewModal(props) {
    const { open, setOpen, product, isAvailable } = props;
  
    const { id, productName, image, description, price, specialPrice } = product;
  
    const closeModal = () => {
      setOpen(false);
    };
  
    return (
      <>
        <Dialog open={open} as="div" className="relative z-10" onClose={closeModal}>
          <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-50" />
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all w-full md:max-w-xl">
                {image && (
                  <div className="flex justify-center aspect-[3/2] bg-gray-100">
                    <img
                      src={image}
                      alt={productName}
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="px-6 pt-6 pb-4">
                  <DialogTitle
                    as="h1"
                    className="text-2xl font-semibold leading-6 text-gray-800 mb-4"
                  >
                    {productName}
                  </DialogTitle>
                  <div className="text-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {specialPrice ? (
                          <>
                            <span className="text-gray-400 line-through">
                              ${Number(price).toFixed(2)}
                            </span>
                            <span className="text-xl font-semibold text-slate-700">
                              ${Number(specialPrice).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-xl font-bold text-slate-700">
                            ${Number(price).toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="ml-auto">
                        {isAvailable ? (
                          <Status
                            text="In Stock"
                            icon={MdDone}
                            bg="bg-teal-200"
                            color="text-teal-900"
                          />
                        ) : (
                          <Status
                            text="Out-Of-Stock"
                            icon={MdClose}
                            bg="bg-rose-200"
                            color="text-rose-700"
                          />
                        )}
                      </div>
                    </div>
                    <Divider className="my-4" />
                    <p className="text-sm">{description}</p>
                    <div className="mt-4">
                      <Button
                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-2 px-4 text-sm font-semibold text-white shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        onClick={closeModal}
                      >
                        Got it, thanks!
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </>
    );
  }
  