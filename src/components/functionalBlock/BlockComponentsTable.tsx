import { MaterialReactTable, MRT_Row, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import FunctionalBlockType from "../../types/FunctionalBlockType";
import ComponentType from "../../types/ComponentType";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import { USDollar } from "../../util/common/stringFormatters";
import EssentialPartModal from "./EssentialPartModal";

interface Props {
  block: FunctionalBlockType
}

const BlockComponentsTable = ({block}: Props) => {

  const [selectedEssentialPart, setSelectedEssentialPart] = useState<ComponentType | null>(null);
  
  const componentColumns = useMemo(
    () => [
      {
        accessorKey: 'type', 
        header: 'Descriptor',
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

    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        //On table row click, set the selected essential part. This is used for opening a modal to display extra details
        setSelectedEssentialPart(row.original);
        //console.log(block?.essentialParts?.indexOf(row.original));
      },
      sx: {
        cursor: 'pointer',
      },
    }),
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

  const theme = createTheme({
    palette: {
      mode: globalTheme.palette.mode, 
      primary: {
        contrastText: "rgba(0, 0, 0, 0.87)",
        dark: "#6642f5",
        light: "#ac98f5",
        main: "#9e90f9",
      }, 
    
      background: {
        default:
          globalTheme.palette.mode === 'light'
            ? '#f0f0f0' 
            : '#000', 
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
      <EssentialPartModal essentialPart={selectedEssentialPart} handleClose={() => setSelectedEssentialPart(null)} />
    </div>
  );
}
 
export default BlockComponentsTable;