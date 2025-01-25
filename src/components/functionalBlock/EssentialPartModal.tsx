import ComponentType from "../../types/ComponentType";
import { getDomainFromLink } from "../../util/common/getUrlDomain";
import { USDollar } from "../../util/common/stringFormatters";
import DataPoint from "../DataPoint";
import Modal from "../Modal";

interface Props {
  essentialPart: ComponentType | null,
  handleClose: () => void
}

const EssentialPartModal = ({essentialPart, handleClose}: Props) => {
  return ( 
    essentialPart ?  
    <Modal
      handleClose={handleClose}
      title={essentialPart?.genericDescription || 
        (essentialPart?.type?.includes("COMPONENT_TYPE") ? essentialPart?.type?.split("COMPONENT_TYPE_")[1] : essentialPart?.type) || 
        'Unnamed Essential Part'
      }

      body={
        <div>
          <DataPoint label="Type" data={essentialPart?.type} />


          <DataPoint label="Notes"> 
            {essentialPart?.notes?.length ? 
              <ul>
                {essentialPart?.notes?.map((note: string, index: number) => (
                  <li key={`note-${index}`}>{note}</li>
                ))}
              </ul>
            : <p>No Notes Found</p>}
          </DataPoint>


          <DataPoint label="Cost" data={essentialPart?.cost ? USDollar.format(essentialPart.cost) : 'Not Found'} />
          <DataPoint label="Purchase Links"> 
            {essentialPart?.purchaseUrls?.length ? 
              <ul>
                {essentialPart?.purchaseUrls?.map((url: string, index: number) => (
                  <a 
                    target="_blank"
                    href={url}
                    key={`purchase-url-${index}`}
                  >
                    {getDomainFromLink(url)}
                  </a>
                ))}
              </ul>
            : <p>No Links Found</p>}
          </DataPoint>

         

          <DataPoint label="Datasheet Links"> 
            {essentialPart?.datasheetUrls?.length ? 
              <ul>
                {essentialPart?.datasheetUrls?.map((url: string, index: number) => (
                  <a 
                    target="_blank"
                    href={url}
                    key={`data-url-${index}`}
                  >
                    {getDomainFromLink(url)}
                  </a>
                ))}
              </ul>
            : <p>No Links Found</p>}
          </DataPoint>

        </div>
      }

      footer={
        <button 
          className="btn secondary" 
          onClick={handleClose}
        >
          Close
        </button>
      }
    />
    : null
  );
}
 
export default EssentialPartModal;