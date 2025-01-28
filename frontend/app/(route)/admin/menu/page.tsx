"use client"

import Accordion, { IAccordionElement } from "@/app/_components/Accordion/Accordion";
import ReactiveButton from "@/app/_components/Button/ReactiveButton";
import DNDList from "@/app/_components/DragAndDrop/DNDList";
import MenuEditForm from "@/app/_components/Menu/MenuEditForm";
import Title from "@/app/_components/Title/Title";
import { useToast } from "@/app/_components/Toast/ToastProvider";
import { useMenu } from "@/app/_hooks/useMenu";
import { IMenu, menuService } from "@/app/_service/menu";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const CommonButtonStyle = styled.div`
  height: 100%;
  border: 2px solid;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.15s;
`;

const MenuSetting = () => {
  const { addToast } = useToast()
  const { menuList, parentMenuList, getChildMenuList, isLoading, refresh } = useMenu()

  // 선택된 메뉴
  const [selectedMenu, setSelectedMenu] = useState<IMenu | null>(null)

  // 메뉴 순서 변경 모달 열기 여부
  const [openMenuOrderSetting, setOpenMenuOrderSetting] = useState<boolean>(false)

  // 새로 추가하는 메뉴의 상위 메뉴 id
  const [defaultParentMenuId, setDefaultParentMenuId] = useState<number | null>(null)

  // DNDList 아이템 리스트
  const [DNDListItems, setDNDListItems] = useState<{id: number, label: string, sort: number}[]>([])

  const buildMenuTree = (menu: IMenu): IAccordionElement => ({
    id: menu.id,
    title: menu.title,
    sort: menu.sort,
    children: getChildMenuList({parentId: menu.id}).map(buildMenuTree)
  });

  const handleAddMenu = () => {
    console.log('add menu')
  }

  const handleDeleteMenu = async () => {
    if (!selectedMenu) {
      addToast({
        message: '메뉴를 선택해주세요.',
        type: 'error'
      })
      return
    } else {
      if (confirm(`${selectedMenu.title}을 정말로 삭제하시겠습니까?`)) {
        await menuService.deleteMenu({
          callback: () => {
            addToast({
              message: '메뉴가 삭제되었습니다.',
              type: 'success'
            })
            setSelectedMenu(null)
            refresh();
          },
          errorCallback: (error:AxiosError) => {
            addToast({
              message: '메뉴 삭제에 실패했습니다.',
              type: 'error'
            })
            console.error('>>> deleteMenu error', error)
          },
          menuId: selectedMenu.id
        })
      }
    }
  }

  const handleUpdateMenuOrder = async ({id, sort}: {id: number, sort: number}) => {
    try {
      await menuService.updateMenu({
        callback: () => {}, 
        errorCallback: (error:AxiosError) => {
          console.error('>>> updateMenuOrder error', error)
        }, 
        data: {sort}, 
        menuId: id
      })
    } catch (error) {
      console.error('>>> error', error)
    }
  }

  const onDragEnd = async (updatedItems: { id: number; label: string; sort: number }[]) => {
    console.log('>>> updatedItems', updatedItems);
    try {
      await Promise.all(
        updatedItems.map((item) => 
          handleUpdateMenuOrder({id: item.id, sort: item.sort})
        )
      );
      refresh();
    } catch (error) {
      console.error(error)
      addToast({
        message: '메뉴 순서 변경에 실패했습니다.',
        type: 'error'
      })
    }
  };

  const buttonList = {
    addParentMenu: {
      title: '상위 메뉴 추가',
      icon: 'fas fa-plus',
      className: 'border-blue-3 text-blue-3 hover:text-white hover:bg-blue-3 hover:border-blue-3',
      onClick: () => {
        setDefaultParentMenuId(null)
        setSelectedMenu(null)
        setOpenMenuOrderSetting(false)
      }
    },
    addChildMenu: {
      title: '하위 메뉴 추가',
      icon: 'fas fa-plus',
      className: 'border-blue-3 text-blue-3 hover:text-white hover:bg-blue-3 hover:border-blue-3',
      onClick: () => {
        setDefaultParentMenuId(selectedMenu?.id ?? null)
        setSelectedMenu(null)
      }
    },
    delete: {
      title: '메뉴 삭제',
      icon: 'fas fa-trash',
      className: 'border-red-2 text-red-2 hover:text-white hover:bg-red-2 hover:border-red-2',
      onClick: () => handleDeleteMenu()
    },
    updateParentMenuOrder: {
      title: '상위 메뉴 순서 변경',
      icon: 'fas fa-sort',
      className: 'border-green-1 text-green-1 hover:text-white hover:bg-green-1 hover:border-green-1',
      onClick: () => {
        setDNDListItems(parentMenuList.map((menu) => ({
          id: menu.id,
          label: menu.title,
          sort: menu.sort
        })))
        setSelectedMenu(null)
        setOpenMenuOrderSetting(true)
      }
    },
    updateChildMenuOrder: {
      title: '하위 메뉴 순서 변경',
      icon: 'fas fa-sort',
      className: 'border-green-1 text-green-1 hover:text-white hover:bg-green-1 hover:border-green-1',
      onClick: () => {
        setDNDListItems(getChildMenuList({parentId: selectedMenu!.id}).map((menu) => ({
          id: menu.id,
          label: menu.title,
          sort: menu.sort
        })))
        setOpenMenuOrderSetting(true)
      }
    },
  }

  // 선택된 메뉴가 변경될 때 DNDListItems 업데이트
  useEffect(() => {
    if (selectedMenu) {
      setDNDListItems(getChildMenuList({parentId: selectedMenu!.id}).map((menu) => ({
        id: menu.id,
        label: menu.title,
        sort: menu.sort
      })))
    } else {
      setDNDListItems(parentMenuList.map((menu) => ({
        id: menu.id,
        label: menu.title,
        sort: menu.sort
      })))
    }
  }, [selectedMenu, menuList])

  return <div>
    <Title title="메뉴 관리" />
    <div className="flex gap-[30px]">
      <div className="w-[40%] min-w-[260px] h-full p-5 rounded-2xl border-2 border-blue-1">
        <div className="grid grid-cols-2 gap-2.5">
          {[buttonList.addParentMenu, buttonList.updateParentMenuOrder].map((button) => (
            <ReactiveButton
              key={button.title}
              props={{
                onClick: button.onClick
              }}
            >
              <CommonButtonStyle className={button.className}>
                <i className={button.icon}></i>
                <span className="flex-1">{button.title}</span>
              </CommonButtonStyle>
            </ReactiveButton>
          ))}
        </div>
        <hr className="my-2.5 text-[#ccc]"/>
        {parentMenuList.sort((a, b) => a.sort - b.sort).map((menu) => (
          <Accordion 
            key={menu.id} 
            onClick={(id) => {
              setSelectedMenu(menuList.find((menu) => menu.id === id) ?? null)
              setDefaultParentMenuId(null)
              setOpenMenuOrderSetting(false)
            }}
            parent={{
              id: menu.id,
              title: menu.title,
              sort: menu.sort
            }} 
            children={getChildMenuList({parentId: menu.id}).map(buildMenuTree)} 
            selectedId={selectedMenu?.id ?? null}
          />
        ))}
      </div>
      <div className="w-[60%] h-full p-5 rounded-2xl bg-blue-5 border-2 border-blue-1">
        {openMenuOrderSetting ? 
          <DNDList 
            items={DNDListItems} 
            onDragEnd={onDragEnd} 
          /> : 
          <div className="h-full flex flex-col gap-5">
            {selectedMenu && 
              <div className="flex gap-2.5">
                {[
                  // 상위 메뉴에서만 하위 메뉴 추가, 순서 변경 버튼 표시
                  ...(getChildMenuList({parentId: selectedMenu.id}).length > 0 ? [buttonList.addChildMenu, buttonList.updateChildMenuOrder] : []), 
                  buttonList.delete
                ].map((button) => (
                  <ReactiveButton
                    key={button.title}
                    props={{
                      onClick: button.onClick
                    }}
                  >
                    <CommonButtonStyle className={`${button.className} w-fit`}>
                      <i className={button.icon}></i>
                      <span className="flex-1">{button.title}</span>
                    </CommonButtonStyle>
                  </ReactiveButton>
                ))}
              </div>
            }
            <MenuEditForm 
              menu={selectedMenu} 
              defaultParentMenuId={defaultParentMenuId} 
            />
          </div>
        }
      </div>
    </div>
  </div>;
}

export default MenuSetting;