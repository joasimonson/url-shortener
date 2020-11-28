import styled from 'styled-components';

export const StatsContainer = styled.div({
    display: 'block',
});

export const StatsRow = styled.div({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center !important',
    marginBottom: '0.5rem'
});

export const StatsBox = styled.div({
    flex: '0 0 25%',
    maxWidth: '25%',
    padding: '2rem',
    border: 'solid 1px #ccc',
    borderRadius: '.25rem',
    textAlign: 'center',
    margin: '5px'
});

export const StatsBoxTitle = styled.div({
    display: 'block',
    fontWeight: 500,
    padding: '0.25rem'
});