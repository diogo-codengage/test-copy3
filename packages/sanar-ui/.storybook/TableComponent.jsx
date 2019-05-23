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

const formatPropType = (propType, recursion) => {
    switch (propType.name) {
        case 'enum':
            return recursion
                ? `(${formatPropTypeEnum(propType)})`
                : formatPropTypeEnum(propType)
        case 'union':
            return formatPropTypeUnion(propType)
        case 'shape':
            return formatPropTypeShape(propType)
        default:
            return propType.name
    }
}

const formatPropTypeEnum = propType =>
    propType.value.map(prop => prop.value.replace(/'/g, '"')).join(' | ')

const formatPropTypeUnion = propType =>
    propType.value.map(prop => formatPropType(prop, true)).join(' | ')

const formatPropTypeShape = propType => (
    <pre>
        {JSON.stringify(
            Object.keys(propType.value).reduce(
                (prev, current) => ({
                    ...prev,
                    [current]: formatPropType(propType.value[current])
                }),
                {}
            ),
            null,
            2
        ).replace(/\\/gi, '')}
    </pre>
)

const PropComponent = ({
    property,
    propType,
    required,
    description,
    defaultValue
}) => (
    <Tr key={property} title={description}>
        <Td>{property}</Td>
        <Td>
            {propType && propType.name ? formatPropType(propType) : propType}
        </Td>
        <Td>{typeof required !== 'undefined' && required.toString()}</Td>
        <Td>
            {defaultValue && Object.keys(defaultValue).length
                ? defaultValue
                : '-'}
        </Td>
    </Tr>
)

const TableComponent = ({ propDefinitions }) => {
    const props = propDefinitions.map(PropComponent)

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
                </tr>
            </thead>
            <tbody>{props}</tbody>
        </Table>
    )
}

export default TableComponent
