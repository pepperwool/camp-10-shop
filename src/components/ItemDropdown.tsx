import { useState, Fragment } from "react"
import { CartItem } from "../types/cart"
import { HiPencil, HiShoppingBag, HiTrash, HiCheckCircle } from "react-icons/hi"
import { Menu, Transition } from "@headlessui/react"
import { HiEllipsisHorizontal } from "react-icons/hi2"
import { DeleteDialog } from "./DeleteDialog"
import { cn } from "../lib/utils"
import React from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BiSolidErrorCircle } from "react-icons/bi"
import { toast } from "react-hot-toast"
import { deleteItem } from "../api/cart"

type ItemDropdownProps = {
  item: CartItem
}

export function ItemDropdown({ item }: ItemDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function editItem() {
    console.log("edit")
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

  // delete item from cart
  const { mutate } = useMutation({
    mutationFn: async (item: CartItem) => {
      await deleteItem(item)
    },
    onSuccess: async () => {
      toast(`Removed successfully.`, {
        icon: <HiCheckCircle className="text-green-500" />,
      })
      queryClient.invalidateQueries(["cart"])
      queryClient.invalidateQueries(["products"])
    },
    onError: () => {
      toast("Failed to delete.", {
        icon: <BiSolidErrorCircle className="text-red-500" />,
      })
    },
  })

  return (
    <div>
      <Menu as="div" className="relative flex text-left">
        <Menu.Button className="flex justify-center items-center text-black rounded-md text-sm font-medium border w-10 h-10 hover:bg-teal-400 hover:text-white">
          <HiEllipsisHorizontal className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
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
          mutate(item)
          closeModal()
        }}
      />
    </div>
  )
}
