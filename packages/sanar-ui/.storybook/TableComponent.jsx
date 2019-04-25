import React from 'react'

const Th = props => <th style={{ fontWeight: 400, padding: 20 }} {...props} />

const Tr = props => (
    <tr
        style={{
            display: 'table-row',
            borderTop: '1px solid rgb(206, 212, 222)'
        }}
        {...props}
    />
)

const Td = props => (
    <td
        style={{ lineHeight: 2, fontWeight: 200, padding: '12px 20px' }}
        {...props}
    />
)

const Table = props => (
    <table
        style={{
            marginTop: 20,
            tableLayout: 'auto',
            boxShadow: 'rgb(206, 212, 222) 0px 0px 0px 1px',
            backgroundColor: 'transparent',
            borderCollapse: 'collapse',
            color: 'rgb(19, 22, 31)',
            overflowY: 'hidden',
            overflowX: 'initial',
            width: '100%',
            fontSize: 14,
            padding: 0,
            borderSpacing: 0,
            borderStyle: 'hidden',
            borderSadius: 2
        }}
        {...props}
    />
)

const TableComponent = ({ propDefinitions }) => {
    const props = propDefinitions.map(
        ({ property, propType, required, description, defaultValue }) => (
            <Tr key={property}>
                <Td>{property}</Td>
                <Td>{propType && propType.name ? propType.name : propType}</Td>
                <Td>
                    {typeof required !== 'undefined' && required.toString()}
                </Td>
                <Td>
                    {defaultValue && Object.keys(defaultValue).length
                        ? defaultValue
                        : '-'}
                </Td>
                <Td>{description}</Td>
            </Tr>
        )
    )

    return (
        <Table>
            <thead
                style={{
                    color: 'rgb(125, 137, 156)',
                    background: 'rgb(238, 241, 245)'
                }}
            >
                <tr>
                    <Th>Property</Th>
                    <Th>Type</Th>
                    <Th>Required</Th>
                    <Th>Default</Th>
                    <Th>Description</Th>
                </tr>
            </thead>
            <tbody>{props}</tbody>
        </Table>
    )
}

export default TableComponent
