package com.hwj.modules.collect.dao;

import com.hwj.modules.collect.model.Collect;

public interface CollectMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table COLLECT
     *
     * @mbg.generated Tue Jan 16 18:40:24 CST 2018
     */
    int deleteByPrimaryKey(String id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table COLLECT
     *
     * @mbg.generated Tue Jan 16 18:40:24 CST 2018
     */
    int insert(Collect record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table COLLECT
     *
     * @mbg.generated Tue Jan 16 18:40:24 CST 2018
     */
    int insertSelective(Collect record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table COLLECT
     *
     * @mbg.generated Tue Jan 16 18:40:24 CST 2018
     */
    Collect selectByPrimaryKey(String id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table COLLECT
     *
     * @mbg.generated Tue Jan 16 18:40:24 CST 2018
     */
    int updateByPrimaryKeySelective(Collect record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table COLLECT
     *
     * @mbg.generated Tue Jan 16 18:40:24 CST 2018
     */
    int updateByPrimaryKey(Collect record);
}