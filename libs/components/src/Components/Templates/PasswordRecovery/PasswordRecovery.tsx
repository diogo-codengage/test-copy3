// import React from 'react'

// // import ESBrandHeader from '../../Atoms/BrandHeader'
// import { SANTypography } from '../../Atoms/Typography'

// import logo from '../../../assets/images/logo/logo-grey.svg'

// const ESPasswordRecoveryTemplate = ({
//     className,
//     image,
//     title,
//     subtitle,
//     actionsMargin,
//     actions,
//     brandHeader,
//     header,
//     fullHeight
// }) => {
//     return (
//         <div className={classes}>
//             <div className='es-password-recovery-template__container-content'>
//                 <div className='es-password-recovery-template__container-content__content'>
//                     <div className={classesInfo}>
//                         <img src={image} />
//                         <SANTypography
//                             className='es-password-recovery-template__container-content__content__infos--title mb-md'
//                             level={4}
//                         >
//                             {title}
//                         </SANTypography>
//                         <SANTypography
//                             className='es-password-recovery-template__container-content__content__infos--subtitle'
//                             variant='subtitle2'
//                         >
//                             {subtitle}
//                         </SANTypography>
//                     </div>

//                     <div className='es-password-recovery-template__container-content__content__actions'>
//                         {actions}
//                     </div>
//                 </div>
//             </div>

//             {fullHeight && (
//                 <div className='es-password-recovery-template__footer'>
//                     <img src={logo} alt='sanar-logo' />
//                 </div>
//             )}
//         </div>
//     )
// }

// ESPasswordRecoveryTemplate.propTypes = {
//     className: PropTypes.string,
//     title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
//     subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
//     image: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
//     actions: PropTypes.node,
//     actionsMargin: PropTypes.oneOf(['default', 'large']),
//     brandHeader: PropTypes.bool,
//     header: PropTypes.node,
//     fullHeight: PropTypes.bool
// }
// ESPasswordRecoveryTemplate.defaultProps = {
//     actionsMargin: 'default',
//     brandHeader: true,
//     fullHeight: true
// }

// export default ESPasswordRecoveryTemplate
