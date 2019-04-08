export function resetData(species) {
    const data = {
        speciesList: {
            
        },
        columns: {
            'column-1': {
                id: 'column-1',
                title: "Partition Left",
                speciesId: species
            },
            'column-2': {
                id: 'column-2',
                title: "Partition Right",
                speciesId: []
            }
        },
        columnsort: ['column-1', 'column-2']
    }
    species.map(name => data.speciesList[name] =
        {
            'id': name,
            'name': name
        }
    )
    return data
}

export function handleConstraintClick(itemIds, source, destination, columns) {
    var col = {...columns}
    var newSource = {...source}
    var newDestination = {...destination}
    
    for (var i = 0; i < itemIds.length; i++) {
        
        let itemIndex = newSource['speciesId'].indexOf(itemIds[i])
        newSource = {...newSource,
            'speciesId': [...newSource['speciesId'].slice(0, itemIndex), 
            ...newSource['speciesId'].slice(itemIndex + 1)]
        }
        
        
        newDestination = {...newDestination,
            'speciesId': [
                ...newDestination['speciesId'].slice(0, itemIndex),
                itemIds[i],
                ...newDestination['speciesId'].slice(itemIndex)
            ]}
        if (source.id === 'column-1') {
            col = {...col, 'column-1': newSource, 'column-2': newDestination}
        } else if (source.id === 'column-2') {
            col = {...col, 'column-1': newDestination, 'column-2': newSource}
        }
    }   
    
    
    return col 
}