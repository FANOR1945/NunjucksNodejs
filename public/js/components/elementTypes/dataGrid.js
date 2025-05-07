const DataGrid = {
    create: (config) => {
      const container = document.createElement('div');
      container.className = 'data-grid-container';
      
      // Configuración del contenedor principal
      Object.assign(container.style, {
        width: '100%',
        maxWidth: '100%',
        overflowX: 'auto',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        ...config.containerStyles
      });
  
      const table = document.createElement('table');
      table.className = 'data-grid-table';
      
      // Configuración flexible de la tabla
      Object.assign(table.style, {
        width: '100%',
        minWidth: config.minWidth || '100%',
        tableLayout: 'auto',
        borderCollapse: 'collapse',
        fontSize: '14px',
        ...config.tableStyles
      });
  
      // Sistema de columnas inteligente
      const colgroup = document.createElement('colgroup');
      config.columns.forEach(col => {
        const colEl = document.createElement('col');
        colEl.style.minWidth = col.minWidth || '100px';
        colEl.style.width = col.width || 'auto';
        colEl.style.maxWidth = col.maxWidth || '1fr';
        colgroup.appendChild(colEl);
      });
      table.appendChild(colgroup);
  
      // Cabecera sticky
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      headerRow.className = 'header-row';
      
      config.columns.forEach((col, index) => {
        const th = document.createElement('th');
        th.textContent = col.title;
        Object.assign(th.style, {
          padding: '12px 16px',
          textAlign: 'left',
          fontWeight: '600',
          backgroundColor: '#2c3e50',
          color: 'white',
          position: 'sticky',
          top: '0',
          zIndex: '10',
          whiteSpace: 'nowrap',
          borderRight: '1px solid #3d566e',
          ...col.headerStyles
        });
        headerRow.appendChild(th);
      });
      
      thead.appendChild(headerRow);
      table.appendChild(thead);
  
      // Cuerpo del grid
      const tbody = document.createElement('tbody');
      
      config.data.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        tr.className = `data-row ${rowIndex % 2 === 0 ? 'even' : 'odd'}`;
        
        config.columns.forEach((col, colIndex) => {
          const td = document.createElement('td');
          const value = col.formatter ? col.formatter(row[col.field], row) : row[col.field];
          
          td.textContent = value;
          Object.assign(td.style, {
            padding: '10px 16px',
            borderBottom: '1px solid #e0e0e0',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            backgroundColor: rowIndex % 2 === 0 
              ? (config.evenRowColor || '#f8f9fa') 
              : (config.oddRowColor || 'white'),
            ...col.cellStyles,
            ...(col.dynamicStyles ? col.dynamicStyles(row[col.field], row) : {})
          });
          
          tr.appendChild(td);
        });
        
        // Efecto hover
        tr.addEventListener('mouseenter', () => {
          tr.style.backgroundColor = '#e8f4fc';
        });
        tr.addEventListener('mouseleave', () => {
          tr.style.backgroundColor = rowIndex % 2 === 0 
            ? (config.evenRowColor || '#f8f9fa') 
            : (config.oddRowColor || 'white');
        });
        
        tbody.appendChild(tr);
      });
      
      table.appendChild(tbody);
      container.appendChild(table);
  
      return container;
    }
  };
  
  export default DataGrid;