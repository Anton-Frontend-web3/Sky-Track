import { Outlet } from 'react-router-dom'

export function CenterLayout() {
  return (
    // 1. fixed inset-0: Слой на весь экран.
    // 2. z-40: Высокий уровень, но НИЖЕ чем у Header (у хедера сделай z-50).
    // 3. overflow-y-auto: Разрешаем скролл для всей страницы, если контент высокий.
    <div className="fixed inset-0 z-40 overflow-y-auto">
      
      {/* 
         Контейнер-центровщик.
         min-h-full: Растягивает флекс на всю высоту экрана (важно для скролла).
         items-start: Прижимает контент к верху.
         pt-28: Тот самый ОТСТУП СВЕРХУ, который тебе нужен.
         pb-10: Отступ снизу, чтобы не прилипало к краю при скролле.
      */}
      <div className="flex min-h-full w-full items-start justify-center px-4 pt-28 pb-10">
        
        {/* Обертка ширины контента */}
        <div className="w-full max-w-lg">
          <Outlet />
        </div>
        
      </div>
    </div>
  )
}