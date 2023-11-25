import React, { useCallback } from 'react';

export default function ExportCsv({ gridApi }) {
    const onBtnExport = useCallback(() => {
            const date = new Date();
            const dd = date.getDate();
            const mm = date.getMonth()+1;
            const yyyy = date.getFullYear();
            const today = dd + "_" + mm + "_" + yyyy
            
            const params = {
                suppressQuotes: true,
                skipColumnHeaders:true,
                fileName: "Asiakkaat " + today,
                columnKeys: [
                    "customerName",
                    "email",
                    "phone",
                    "streetaddress",
                    "postcode",
                    "city",
                ],
            };
            gridApi.exportDataAsCsv(params);
    }, [gridApi]);

    return (
        <div style={{ margin: '10px 0' }}>
            <button onClick={onBtnExport}>Download CSV export file</button>
        </div>
    );
}