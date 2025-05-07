const Table = {
  create: (config) => {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const tfoot = config.footer ? document.createElement('tfoot') : null;

    // Estilos base de la tabla (100% del contenedor padre)
    Object.assign(table.style, {
      width: '100%',
      tableLayout: config.fixedLayout ? 'fixed' : 'auto',
      borderCollapse: 'collapse',
      margin: '16px 0',
      fontSize: '14px',
      ...config.styles
    });

    // Configuración de columnas
    const colgroup = document.createElement('colgroup');
    if (config.columnsWidth) {
      config.columnsWidth.forEach(width => {
        const col = document.createElement('col');
        col.style.width = width;
        colgroup.appendChild(col);
      });
      table.appendChild(colgroup);
    }

    // Encabezado (ocupará todo el ancho)
    if (config.headers) {
      const headerRow = document.createElement('tr');
      config.headers.forEach((header, index) => {
        const th = document.createElement('th');
        th.textContent = header;
        Object.assign(th.style, {
          padding: '12px 15px',
          border:'1px solid white',
          textAlign: 'left',
          fontWeight: '600',
          position: 'sticky',
          top: '0',
          whiteSpace: 'nowrap',
          ...config.headerStyles,
          ...(config.columnStyles && config.columnStyles[index])
        });
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);
    }

    // Filas de datos (expansión completa)
    if (config.rows) {
      config.rows.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        
        // Estilos base de fila
        Object.assign(tr.style, {
          width: '100%',
          ...(rowIndex % 2 === 0 ? config.evenRowStyles : config.oddRowStyles)
        });

        // Celdas (ocuparán todo el espacio disponible)
        row.forEach((cell, cellIndex) => {
          const td = document.createElement('td');
          td.textContent = cell;
          
          Object.assign(td.style, {
            padding: '12px 15px',
            width: config.columnsWidth ? config.columnsWidth[cellIndex] : 'auto',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            ...config.cellStyles,
            ...(config.columnStyles && config.columnStyles[cellIndex])
          });
          
          tr.appendChild(td);
        });
        
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
    }

    // Pie de tabla (full width)
    if (tfoot && config.footer) {
      const footerRow = document.createElement('tr');
      config.footer.forEach((footerCell, index) => {
        const td = document.createElement('td');
        td.textContent = footerCell;
        Object.assign(td.style, {
          padding: '12px 15px',
          width: config.columnsWidth ? config.columnsWidth[index] : 'auto',
          ...config.footerStyles
        });
        footerRow.appendChild(td);
      });
      tfoot.appendChild(footerRow);
      table.appendChild(tfoot);
    }

    return table;
  }
};

export default Table;