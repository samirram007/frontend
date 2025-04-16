



import UserInitialValueContextProvider from '../context/UserInitialValueContextProvider';
import DisplayCard from './DisplayCard';
import FilterTable from './FilterTable';
const DataTable = () => { 
  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns = [
    {
      header: "ID", accessorKey: "id", visible: false, size: 50,
    },
    {
      header: "Name", accessorKey: "name", size: 300,
    },
     
    {
      header: 'Action', accessorKey: 'action', align: 'center',
      cell: ({ row }) => {
        return (
          <UserInitialValueContextProvider mode="edit"  selectedData={row.original}>
            <DisplayCard />
          </UserInitialValueContextProvider>
        )
      }
    }

  ]

  return (
    <FilterTable columns={columns} 
    />
  )
}

export default DataTable
