import { useState, Fragment } from "react"
import { CartItem } from "../types/cart"
import { HiPencil, HiShoppingBag, HiTrash } from "react-icons/hi"
import { Menu, Transition } from "@headlessui/react"
import { HiEllipsisHorizontal } from "react-icons/hi2"
import { DeleteDialog } from "./DeleteDialog"
import { cn } from "../lib/utils"
import React from "react"
import { deleteItem } from "../api/cart"

type ItemDropdownProps = {
  item: CartItem
}

export function ItemDropdown({ item }: ItemDropdownProps) {
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

  // async function deleteItem() {
  //   await axios.delete(`http://localhost:3000/cart/${item.id}`)
  //   const { data: product } = await axios.get<Product>(
  //     `http://localhost:3000/products/${item.productId}`
  //   )
  //   await axios.patch(`http://localhost:3000/products/${item.productId}`, {
  //     stock: product.stock + item.quantity,
  //   })
  //   closeModal()
  // }
  
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
        deleteItem={() => {
          deleteItem(item)
          closeModal()
        }}
      />
    </>
  )
}
