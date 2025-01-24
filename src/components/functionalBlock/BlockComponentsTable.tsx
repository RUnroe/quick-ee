import { MaterialReactTable, MRT_Row, useMaterialReactTable } from "material-react-table";
import { useMemo } from "react";
import FunctionalBlockType from "../../types/FunctionalBlockType";
import ComponentType from "../../types/ComponentType";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";

interface Props {
  block: FunctionalBlockType
}

const BlockComponentsTable = ({block}: Props) => {

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  const componentColumns = useMemo(
    () => [
      {
        accessorKey: 'type', 
        header: 'Type',
        Cell: ({ row }: {row: MRT_Row<ComponentType>}) => (
          row.original?.genericDescription || 
          (row.original?.type?.includes("COMPONENT_TYPE") ? row.original?.type?.split("COMPONENT_TYPE_")[1] : row.original?.type)
        ),
        
      },
      {
        accessorKey: 'value', 
        header: 'Value',
      },
      {
        accessorKey: 'footprints', 
        header: 'Footprints',
        Cell: ({ cell }: {cell: {getValue: () => string[]}}) => cell?.getValue()?.join(", "),
      },
      {
        accessorKey: 'cost', 
        header: 'Cost',
        size: 10,
        Cell: ({ cell }: {cell: {getValue: () => string}}) => USDollar.format(parseFloat(cell?.getValue())),
      },
     
    ],
    [],
  );

  const essentialComponentsTable = useMaterialReactTable({
    columns: componentColumns,
    data: block?.essentialParts || [],
    enableColumnOrdering: false, 
    enableRowSelection: false,
    enablePagination: true,
    enableDensityToggle: false,
    enableHiding: false,
  });

  const passiveComponentsTable = useMaterialReactTable({
    columns: componentColumns,
    data: block?.passives || [],
    enableColumnOrdering: false, 
    enableRowSelection: false,
    enablePagination: true,
    enableDensityToggle: false,
    enableHiding: false,
  });
  
  const globalTheme = useTheme();
  console.log(globalTheme)
  const theme = createTheme({
    palette: {
      mode: globalTheme.palette.mode, //let's use the same dark/light mode as the global theme
      primary: {
        contrastText: "rgba(0, 0, 0, 0.87)",
        dark: "#6642f5",
        light: "#ac98f5",
        main: "#9e90f9",
      }, //swap in the secondary color as the primary for the table
    
      background: {
        default:
          globalTheme.palette.mode === 'light'
            ? '#f0f0f0' //random light yellow color for the background in light mode
            : '#000', //pure black table in dark mode for fun
      },
    },


  });

  const getCostTotal = (componentList: ComponentType[]) => {
    return componentList.reduce((accumulator: number, currentValue: ComponentType) => accumulator + (currentValue?.cost || 0), 0);
  }

  return (  
    <div>
      <ThemeProvider theme={theme}>
      <div className="table-group essentials">
        <h3 className="sub-title">Essential ({block?.essentialParts?.length || 0})</h3>
        <ThemeProvider theme={theme}>
        <MaterialReactTable table={essentialComponentsTable} /></ThemeProvider>
        <div className="table-footer-row">
          <div className="cell sub-text">Subtotal</div>
          <div className="cell">{USDollar.format(getCostTotal(block?.essentialParts || []) || 0)}</div>
        </div>
      </div>

      <div className="table-group passives">
        <h3 className="sub-title">Passive ({block?.passives?.length || 0})</h3>
        <MaterialReactTable table={passiveComponentsTable} />
        <div className="table-footer-row">
          <div className="cell sub-text">Subtotal</div>
          <div className="cell">{USDollar.format(getCostTotal(block?.passives || []) || 0)}</div>
        </div>
      </div>

      <div className="table-group total">
        <h3 className="sub-title">Total </h3>
        <div className="table-footer-row">
          <div className="cell">{(block?.essentialParts?.length || 0) + (block?.passives?.length || 0) } Components</div>
          <div className="cell">{USDollar.format((getCostTotal(block?.essentialParts || []) || 0) + (getCostTotal(block?.passives || []) || 0))}</div>
        </div>
      </div>
      </ThemeProvider>
    </div>
  );
}
 
export default BlockComponentsTable;