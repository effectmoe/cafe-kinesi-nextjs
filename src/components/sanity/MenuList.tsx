import { useSanityData } from '@/hooks/useSanityData'
import { MENU_ITEMS_QUERY } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface MenuItem {
  _id: string
  name: string
  nameEn?: string
  description?: string
  descriptionEn?: string
  price: number
  category: string
  image?: any
  available: boolean
  featured?: boolean
}

export function MenuList() {
  const { data: menuItems, isLoading, error } = useSanityData(MENU_ITEMS_QUERY, 'menuItems')

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[200px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        エラーが発生しました: {error.message}
      </div>
    )
  }

  if (!menuItems || menuItems.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        メニューアイテムがありません
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {(menuItems as MenuItem[]).map((item) => (
        <Card key={item._id} className={!item.available ? 'opacity-50' : ''}>
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
            {item.nameEn && (
              <CardDescription className="text-sm text-gray-500">
                {item.nameEn}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {item.image && (
              <img
                src={urlFor(item.image).width(400).height(300).url()}
                alt={item.name}
                className="w-full h-48 object-cover rounded mb-2"
              />
            )}
            {item.description && (
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            )}
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">¥{item.price.toLocaleString()}</span>
              {item.featured && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  おすすめ
                </span>
              )}
            </div>
            {!item.available && (
              <p className="text-sm text-red-500 mt-2">現在提供しておりません</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}