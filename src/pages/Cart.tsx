import { useRouteLoaderData } from "react-router-dom"
import { CartItem } from "../types/cart"
import { Product } from "../types/products"
import { HiEllipsisHorizontal } from "react-icons/hi2"
import { Menu, Transition, Dialog } from "@headlessui/react"
import { cn } from "../lib/utils"
import { HiPencil, HiTrash, HiShoppingBag } from "react-icons/hi"
import React, { Fragment, useState } from "react"
import axios from "axios"
import { Button } from "../components/Button"

export function Cart() {
  const { cart, products } = useRouteLoaderData("root") as {
    cart: CartItem[]
    products: Product[]
  }

  return (
    <div>
      {products.map((product) => {
        const item = cart.find((item) => item.productId === product.id)
        const quantity = item?.quantity || 0
        return (
          <div key={product.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover"
              />
              <span className="font-medium text-lg">{product.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Price: ${product.price}</span>
              <span>Quantity: {quantity}</span>
              <span>Total: ${quantity * product.price}</span>
              {item && <ItemDropdown item={item} />}
            </div>
          </div>
        )
      })}
    </div>
  )
}

type ItemDropdownProps = {
  item: CartItem
}

function ItemDropdown({ item }: ItemDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function editItem() {
    console.log("edit")
  }
  async function deleteItem() {
    await axios.delete(`http://localhost:3000/cart/${item.id}`)
    closeModal()
  }
  function changeQuantity() {
    console.log("change quantity")
  }

  const actions = [
    { name: "Edit", icon: <HiPencil />, function: editItem },
    {
      name: "Change Quantity",
      icon: <HiShoppingBag />,
      function: changeQuantity,
    },
    { name: "Delete", icon: <HiTrash />, function: openModal },
  ]

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center text-black rounded-md px-4 py-2 text-sm font-medium">
            <HiEllipsisHorizontal className="h-5 w-5" aria-hidden="true" />
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
          <Menu.Items className="absolute right-0 mt-2 w-56 z-30 origin-top-right rounded-md bg-white shadow-lg">
            <div className="px-1 py-1 ">
              {actions.map((action) => (
                <Menu.Item key={action.name}>
                  {({ active }) => (
                    <button
                      onClick={action.function}
                      className={cn(
                        active ? "bg-indigo-500 text-white" : "text-gray-900",
                        "group flex w-full items-center rounded-md px-2 py-2 text-sm"
                      )}
                    >
                      {React.cloneElement(action.icon, {
                        className: cn(
                          "mr-2 h-5 w-5",
                          action.name === "Delete" && "text-red-500"
                        ),
                      })}
                      {action.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <DeleteDialog
        isOpen={isOpen}
        closeModal={closeModal}
        deleteItem={deleteItem}
      />
    </>
  )
}

type DeleteDialogProps = {
  isOpen: boolean
  closeModal: () => void
  deleteItem: () => void
}

function DeleteDialog({ isOpen, closeModal, deleteItem }: DeleteDialogProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          console.log("closing")
          closeModal()
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Are you sure you want to delete that item
                </Dialog.Title>

                <div className="mt-4 flex gap-4">
                  <Button variant="ghost" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={deleteItem}>
                    Delete
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
