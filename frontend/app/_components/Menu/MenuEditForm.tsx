"use client";

import { useMenu } from "@/app/_hooks/useMenu";
import { IMenu, MenuSavePayload, menuService } from "@/app/_service/menu";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import Select from "../Input/Select";
import TextField from "../Input/TextField";
import Toggle from "../Input/Toggle";
import { useToast } from "../Toast/ToastProvider";

interface MenuEditFormProps {
  menu: IMenu | null;
  defaultParentMenuId?: number | null;
}

const toggleList = [
  {label: '메뉴 활성화', key: 'isActive'},
  {label: '메뉴 표시', key: 'isShown'},
  {label: '외부 링크', key: 'isExternal'},
  {label: '새 탭에서 열기', key: 'isOpenInNewTab'}
];

const MenuEditForm = ({menu, defaultParentMenuId}: MenuEditFormProps) => {
  const {refresh, parentMenuList, getChildMenuList} = useMenu();
  const {addToast} = useToast();
  
  const {register, watch, setValue, handleSubmit, formState: {errors}, reset} = useForm<IMenu>({
    defaultValues: menu ? {...menu, parentId: menu.parentId ?? defaultParentMenuId} : {},
  });

  useEffect(() => {
    if (menu) {
      reset({...menu, parentId: menu.parentId ?? defaultParentMenuId});
    } else {
      reset({parentId: defaultParentMenuId, title: '', link: ''});
    }
  }, [menu, reset, defaultParentMenuId]);

  const handleCreateMenu = async (data: MenuSavePayload) => {
    const sort = data.parentId ? 
      getChildMenuList({parentId: data.parentId, isShown: true, isActive: true}).length + 1 : 
      Math.max(...parentMenuList.map(m => m.sort)) + 1;
    try {
      await menuService.createMenu({
        data: {...data, sort},
        callback: () => {
          addToast({
            message: '메뉴가 생성되었습니다.',
            type: 'success'
          });
          refresh();
        },
        errorCallback: (error:AxiosError) => {
          addToast({
            message: '메뉴 생성에 실패했습니다.',
            type: 'error'
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdateMenu = async (data: MenuSavePayload) => {
    try {
      await menuService.updateMenu({
        menuId: menu?.id,
        data,
        callback: () => {
          addToast({
            message: '메뉴가 수정되었습니다.',
            type: 'success'
          });
          refresh();
        },
        errorCallback: (error:AxiosError) => {
          addToast({
            message: '메뉴 수정에 실패했습니다.',
            type: 'error'
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  const onSubmit = (data: MenuSavePayload) => {
    const sanitizedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value === '' ? null : value])
    );

    if (menu) {
      handleUpdateMenu(sanitizedData);
    } else {
      handleCreateMenu(sanitizedData);
    }
  }

  return <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      {(menu?.parentId || defaultParentMenuId) && 
        <Select
          label="상위 메뉴"
          value={menu?.parentId || defaultParentMenuId}
          options={
            parentMenuList
              .sort((a, b) => a.sort - b.sort)
              .map(m => ({value: m.id, label: m.title}))
          }
          onChange={(value) => {
            setValue('parentId', value);
          }}
          error={errors.parentId}
          position="horizontal"
        />
      }
      <TextField
        label="메뉴 이름"
        placeholder="메뉴 이름을 입력해주세요."
        inputType="text"
        register={register('title', {required: '메뉴 이름을 입력해주세요.'})}
        error={errors.title}
      />
      <TextField
        label="연결되는 링크"
        placeholder="연결되는 링크를 입력해주세요."
        description="하위 메뉴를 추가하려면 링크를 빈칸으로 남겨두세요."
        inputType="text"
        register={register('link')}
        error={errors.link}
      />
      <TextField
        label="메뉴 설명"
        placeholder="메뉴 설명을 입력해주세요."
        inputType="text"
        register={register('description')}
        error={errors.description}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-5">
        {toggleList.map(toggle => (
          <div key={`menu-toggle-${toggle.key}`} className="max-w-[170px]">
            <Toggle 
              checked={Boolean(watch(toggle.key as keyof IMenu))}
              onChange={(checked) => {setValue(toggle.key as keyof IMenu, checked)}} 
              label={toggle.label} 
            />
          </div>
        ))}
      </div>
      <Select
        label="메뉴 권한"
        value={menu?.permission || 'anonymous'}
        options={[
          {value: 'anonymous', label: '모든 이용자'},
          {value: 'user', label: '회원'},
          {value: 'admin', label: '관리자'},
          {value: 'teacher', label: '선생님'},
          {value: 'parent', label: '학부모'},
          {value: 'student', label: '학생'},
        ]}
        onChange={(value) => {
          setValue('permission', value);
        }}
        error={errors.permission}
        position="horizontal"
      />
      <div className="mt-5">
        <Button type="submit" color="blue" fullWidth>저장</Button>
      </div>
    </form>
  </div>
}

export default MenuEditForm;