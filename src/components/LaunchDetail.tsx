import React  from 'react';
import { useQuery } from 'urql';
import { useParams } from "react-router-dom";
import YouTube from 'react-youtube';
import { Card, Image, Alert, Row, Col } from 'antd';

import { LaunchQuery } from '../graphql/query';
import { parseYoutubeUrl, formatDate } from '../helpers';
import Loading from './Loading';
import StatusTag from './StatusTag';

type Params = {
  launchId: string;
}

function LaunchDetail() { 
  let { launchId } = useParams<Params>();

  const [result] = useQuery({
    query: LaunchQuery,
    variables: { id: launchId }
  });

  const { data, fetching, error } = result;

  if (fetching) {
    return <Loading />;
  }
  if (error) {
    return <Alert message={error.message} type="error" />;
  }

  const { launch: { mission_name, details, links, launch_date_unix, launch_success } } = data
  const videoId = parseYoutubeUrl(links.video_link)

  return (
    <div className='launch-detail'>
      <div className='container'>
        <h1>{mission_name}</h1>

        <Row gutter={24}>
          <Col xs={24} md={10}>
            <Card>
              <p><strong>Date:</strong> {formatDate(launch_date_unix)}</p>
              <p><strong>Status:</strong> <StatusTag success={launch_success} /></p>
            </Card>
            {details && <Card>{details}</Card>}
          </Col>
          
          <Col xs={24} md={14}>
            {videoId ? (
              <Card>
                <h2>Video</h2>
                <YouTube videoId={videoId} containerClassName='youtube-wrapper'/>
              </Card>
            ): ''}
            {links.flickr_images && links.flickr_images.length ? (
              <Card>
                <h2>Images</h2>
                <Image.PreviewGroup>
                  {links.flickr_images.map((image: string) => (
                    <Image
                      height={130}
                      width={130}
                      src={image}
                      wrapperStyle={{ marginRight: 10}}
                    />
                  ))}
                </Image.PreviewGroup>
              </Card>
            ) : ''}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default LaunchDetail;
