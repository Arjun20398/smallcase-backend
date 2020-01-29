import React, {Component} from 'react'
import {Row, Col} from 'reactstrap'

export class PageChoose extends Component {

    render() {
        var pagelist = this.props.pagelist,
            currentPage = this.props.currentPage,
            onPageChoose = this.props.handlePageChange;

        return (
            <Row>
                <Col>
                    <div className="pagination">
                        <button onClick={(e)=> onPageChoose(e,0)} >&laquo;</button>
                        {pagelist.map((anObjectMapped, index) => {
                            return (
                                <button key={index} className = {index+1 === currentPage ? "active" : ""} onClick={(e)=> onPageChoose(e,index)} >{index+1}</button>
                            );
                        })}
                        <button onClick={(e)=> onPageChoose(e,pagelist.length-1)}>&raquo;</button>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default PageChoose
